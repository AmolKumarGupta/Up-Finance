import Table from "components/Tables/Table"
import { useState } from "react"


export default function Tester() {
  const [order, setOrder] = useState('asc')
  const [data, setData] = useState([
    {
      id: 1,
      name: "test1",
      classname: "10th",
      rollno: 12
    },
    {
      id: 2,
      name: "test 2",
      classname: "9th",
      rollno: 3
    }
  ])

  function sort() {
    setData(data.reverse())
    setOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const tablehead = <tr>
    <th className="p-2 bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700" onClick={sort}>
      # <i role="button" className={`fa fa-sort-${order === 'asc' ? 'up' : 'down'}`}></i>
    </th>
    <th className="p-2 bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">Name</th>
    <th className="p-2 bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">Class</th>
    <th className="p-2 bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700">Roll no.</th>
  </tr>

  return (
    <div className="flex flex-wrap relative">
      <div className="w-full mb-12 px-4">
        <Table
          head={tablehead}
          data={data}
          bodyAttr={{ className: `p-2 text-center sorting-${order}`, }}
          attr={{
            className: "w-full shadow-lg rounded bg-lightBlue-900 text-white"
          }}
        />
      </div>
    </div>
  )
}
