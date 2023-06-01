import { useMemo } from "react"

export default function Table({
  head,
  foot,
  data,
  attr,
  bodyAttr
}) {

  const renderedData = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.map((t) => {
      let collection = []
      for (const [label, val] of Object.entries(t)) {
        collection.push(<td {...bodyAttr} key={label}>{val}</td>)
      }

      return <tr key={JSON.stringify(t)}>{collection}</tr>
    })
  }, [data, bodyAttr])

  return (
    <table {...attr} >
      <thead>
        {head}
      </thead>
      <tbody>
        {renderedData}
      </tbody>
      <tfoot>
        {foot}
      </tfoot>
    </table>
  )
}
