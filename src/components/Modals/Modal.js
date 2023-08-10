
export default function Modal({ children, isOpen, handleOpen, title, okText, closeText, onSave }) {

  function handleFocus(e) {
    let id = e.target.getAttribute("id");
    if (id === "defaultModal") {
      handleOpen(false)
    }
    e.stopPropagation()
  }

  return (
    <>
      <div onClick={handleFocus} id="defaultModal" tabIndex="-1" aria-hidden="true" className={`${isOpen === true ? '' : 'hidden'} fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full bg-gray-500/75`}>
        <div className="relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title ? title : "Create"}
              </h3>
              <button onClick={() => handleOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="">
              {children}
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded dark:border-gray-600">
              <button onClick={() => onSave()} data-modal-hide="defaultModal" type="button" className="text-white bg-lightBlue-500 hover:bg-lightBlue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{okText ? okText : "Save"}</button>
              <button onClick={() => handleOpen(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{closeText ? closeText : "Close"}</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
