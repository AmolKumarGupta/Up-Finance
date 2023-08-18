import Modal from "components/Modals/Modal"
import { useEffect, useMemo, useState } from "react"
import transactionConfig from "config/transaction";
import { createTransaction, transactions, deleteTransaction } from "models/transaction";

export default function Transaction() {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: transactionConfig?.types[0],
    amount: 0
  });
  const [errorBag, setErrorBag] = useState({});
  const [tableMeta, setTableMeta] = useState({
    limit: 5,
    page: 1
  });
  const [tableResult, setTableResult] = useState({totalPages: null})

  const handleDelete = async (id, rows = null) => {
    if (! id || rows===null) {
      return alert('Something went wrong!')
    }

    if (window.confirm('Are you really want to delete?')) {
      const response = await deleteTransaction(id)
      if (response === null) {
        return;
      }

      const result = await response.text()
      const parsedResult = JSON.parse(result)
      if (parsedResult.errors) {
        return;
      }
      if (parsedResult?.data?.transaction_delete) {
        setRows((rows) => rows.filter((data) => data._id!==id))
      }
    }
    return
  }

  const content = useMemo(() => {
    let tableStruct = {
      index: 1,
      name: (data, rows = null) => data?.name,
      type: (data, rows = null) => data?.type,
      amount: (data, rows = null) => "Rs. "+ data?.amount,
      action: (data, rows = null) => <i onClick={ () => handleDelete(data?._id, rows) } className="fa fa-sm fa-trash text-red-500 cursor-pointer"></i>
    };

    return rows.map((e) => {
      return <tr key={e._id} className="hover:bg-blueGray-100">
        {
          Object.entries(tableStruct).map(([key, cb]) => {
            let val = (key === 'index')
              ? tableStruct.index++
              : cb(e, rows)

            return <td className="p-2 text-center" key={`${key}-${e._id}`}>{val}</td>
          })
        }
      </tr>
    });
  }, [rows])
  
  useEffect(() => {
    transactions(tableMeta)
      .then(res => res.text())
      .then(json => {
        const parsedData = JSON.parse(json);
        const data = parsedData.data.transactions
        setRows(data.data)
        setTableResult(prev => {
          return { ...prev, totalPages: data.totalPages }
        })
      })
  }, [tableMeta])

  
  async function handleSave() {
    if (! formData.name) {
      setErrorBag({name: 'required'})
      return;
    }
    
    if (! formData.type) {
      setErrorBag({type: 'required'})
      return;
    }

    if (! formData.amount) {
      setErrorBag({amount: 'required'})
      return;
    }

    try {
      const response = await createTransaction(formData)
      const result = await response.text()
      const parsedResult = JSON.parse(result)
      if (! parsedResult.errors) {
        setModalOpen(false)
        transactions(tableMeta)
          .then(res => res.text())
          .then(json => {
            const parsedData = JSON.parse(json);
            const data = parsedData.data.transactions
            setRows(data.data)
            setTableResult(prev => {
              return { ...prev, totalPages: data.totalPages }
            })
          })
      }

    }catch (err) {
      alert('Something went wrong')
    }
  }

  function navigatePage(data = 1) {
    if (tableMeta.page && tableMeta.page+data < 1) return;
    if (tableMeta.page && tableMeta.page+data > tableResult.totalPages) return;

    setTableMeta(prev => {
      return { ...prev, page: prev.page+data }
    })
  }

  return (
    <>
      <div className="flex flex-wrap relative">
        <div className="w-full mb-2 mx-4 rounded text-blueGray-700 bg-white">
          <div className="flex justify-between items-center py-2 px-4">
            <h3 className="font-semibold text-xl">Transactions</h3>
            <div className="flex gap-2 items-center ">
              <i onClick={() => setModalOpen(true)} className="fa fa-plus p-1 [line-height:.75rem] text-white bg-lightBlue-600 text-sm rounded-full cursor-pointer"></i>
              <input className="py-2 px-2 rounded border border-gray-300 focus:border-gray-300 focus-visible:border-gray-300" placeholder="Search ..." />
            </div>
          </div>
          <table className="w-full shadow-lg rounded border-collapse ">
            <thead>
              <tr className="bg-blueGray-50 rounded">
                <th className="p-2">
                  #
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {content}
            </tbody>
            <tfoot>
              <tr>
                <th className="p-2">
                  #
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Actions</th>
              </tr>

            </tfoot>
          </table>
        </div>

        <div className="mx-4 ms-auto mb-12 inline-flex justify-center gap-1">
          <button onClick={() => navigatePage(-1)} className="inline-flex h-8 w-8 items-center justify-center rounded border border-white bg-lightBlue-600 text-white rtl:rotate-180 cursor-pointer">
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div>
            <label htmlFor="PaginationPage" className="sr-only">Page</label>

            <input
              type="number"
              className="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              min="1"
              value={tableMeta.page}
              onChange={
                (ev) => { ev.preventDefault() }
              }
            />
          </div>

          <button 
            onClick={() => navigatePage(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-white bg-lightBlue-600 text-white rtl:rotate-180 cursor-pointer"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        handleOpen={setModalOpen}
        title="Create Transaction"
        onSave={handleSave}
      >

        <div className="flex flex-wrap p-6 bg-blueGray-100">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-name">Name</label>
              <input 
                id="trans-name"
                className={`${ errorBag.name? 'border border-red-500': 'border-0' } px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} 
                value={formData.name}
                onChange={(ev) => setFormData(prev => { return {...prev, name: ev.target.value} })}
              />
            </div>

            <div className="flex gap-2 w-full mb-3">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-type">Type</label>
                <select 
                  id="trans-type"
                  className="capitalize border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                  value={formData.type}
                  onChange={(ev) => setFormData((prev => {return {...prev, type: ev.target.value.toLocaleLowerCase()}}))}
                >
                  { 
                    transactionConfig?.types.map(type => {
                      return <option key={type} value={type.toLowerCase()} className="capitalize" >{type}</option>
                    }) 
                  }
                </select>
              </div>

              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-amount">Amount</label>
                <input 
                  id="trans-amount"
                  className={`${errorBag.amount? 'border border-red-500': 'border-0'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} 
                  value={formData.amount}
                  onChange={(ev) => setFormData(prev => {return {...prev, amount: ev.target.value.replace(/[^0-9.-]/g, '')}})}
                />
              </div>
            </div>
        </div>

      </Modal>
    </>
  )
}
