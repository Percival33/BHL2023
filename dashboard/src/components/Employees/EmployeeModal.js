//import { LocationMarkerIcon, PhoneIcon, MailIcon, TrendingDownIcon } from '@heroicons/react/solid';

export default function EmployeeModal({ setShowModal, employee }) {

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-3/4 md:w-3/4 lg:w-1/2 my-6 mx-auto max-w-6xl max-h-[75%] overflow-y-auto rounded-lg">
                    {/*content*/}
                    <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold overflow-ellipsis max-w-xs">
                                {employee.name}
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className='text-gray-500 my-4'>
                                opis
                            </p>
                            <ul className="my-4">
                                <li className="flex items-center">
                                    {/* <PhoneIcon className="w-5 h-5 mr-1 fill-green-500" /> */}
                                    <span className="mr-2">aaa</span>
                                </li>
                                <li className="flex items-center">
                                    {/* <MailIcon className="w-5 h-5 mr-1 fill-yellow-500" /> */}
                                    <span className="mr-2">aaa</span>
                                </li>
                                <li className="flex items-center">
                                    {/* <LocationMarkerIcon className="w-5 h-5 mr-1 fill-red-500" /> */}
                                    <span className="mr-2">aaa</span>
                                </li>
                                <li className="flex items-center">
                                    {/* <TrendingDownIcon className="w-5 h-5 mr-1 fill-blue-500" /> */}
                                    <span className="mr-2">aaa</span>
                                </li>
                            </ul>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}