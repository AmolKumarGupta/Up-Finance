import Modal from "components/Modals/Modal"
import { useMemo, useState } from "react"
import transactionConfig from "config/transaction";

export default function Transaction() {
  const [data] = useState([
    {
      id: 1,
      name: "Pen",
      type: "expense",
      amount: 100.00
    }, {
      id: 2,
      name: "Cardboard",
      type: "expense",
      amount: 200.00
    }, {
      id: 3,
      name: "Rent",
      type: "income",
      amount: 3000.00
    },
  ])

  const [modalOpen, setModalOpen] = useState(false);

  const content = useMemo(() => {
    return data.map((e) => {
      return <tr key={e.id} className="hover:bg-blueGray-100">
        {
          Object.entries(e).map(([key, val]) => {
            return <td className="p-2 text-center" key={`${key}-${e.id}`}>{val}</td>
          })
        }
      </tr>
    })
  }, [data])

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
              </tr>

            </tfoot>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        handleOpen={setModalOpen}
        title="Create Transaction"
      >

        <div className="flex flex-wrap p-6 bg-blueGray-100">
          {/* <div className="w-full px-4"> */}

            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-name">Name</label>
              <input 
                id="trans-name"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
              />
            </div>

            <div className="flex gap-2 w-full mb-3">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-type">Type</label>
                <select 
                  id="trans-type"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                >
                  { transactionConfig?.types.map(type => <option key={type} value={type.toLowerCase()}>{type}</option>) }
                </select>
              </div>

              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="trans-amount">Amount</label>
                <input 
                  id="trans-amount"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                />
              </div>
            </div>

          {/* </div> */}
        </div>

      </Modal>
    </>
  )
}
