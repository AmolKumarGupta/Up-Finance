import { Link } from "react-router-dom"

export default function Nav({ data, title }) {
  return <>
    {/* Divider */}
    <hr className="my-4 md:min-w-full" />
    {/* Heading */}
    <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
      {title}
    </h6>
    {/* Navigation */}

    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {data.map((subbar) => {
        return <li key={subbar.title} className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf(subbar.link) !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to={subbar.link}
          >
            <i
              className={
                `${subbar.icon} mr-2 text-sm ` +
                (window.location.href.indexOf(subbar.link) !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            {subbar.title}
          </Link>
        </li>
      })}
    </ul>
  </>
}
