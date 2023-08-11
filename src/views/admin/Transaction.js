import Modal from "components/Modals/Modal"
import { useState } from "react"
import transactionConfig from "config/transaction";
import { createTransaction } from "models/transaction";

export default function Transaction() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: transactionConfig?.types[0],
    amount: 0
  });

  const [errorBag, setErrorBag] = useState({});

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
      }

    }catch (err) {
      alert('Something went wrong')
    }
  }

  return (
    <>
      <div className="flex flex-wrap relative">
        <div className="w-full mb-12 mx-4 rounded text-blueGray-700 bg-white">
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
              </tr>
            </thead>
            <tbody>
              {/* {content} */}
            </tbody>
            <tfoot>
              <tr>
                <th className="p-2">
                  #
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
              </tr>

            </tfoot>
          </table>
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
