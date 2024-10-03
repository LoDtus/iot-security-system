import '../App.css'

function NavigationBar({setIdDevice, field, deviceName, wifiName, openAddDevice, setOpenAddDevice}) {
    return (
        <div className="navigationBar basis-[20%]">
            <div className='font-semibold text-xl mb-3'>List Device</div>
            <div className='container-post sm:flex lg:block overflow-x-auto max-h-[80vh] overflow-y-auto lg:pr-2'>
                <div className="add-documents sm:min-h-full lg:h-[30px] sm:min-w-[180px] lg:w-full sm:mb-3 lg:mb-2 p-5 bg-[#fafafa] 
                rounded-md border-2 border-dashed border-[#ccced1] flex justify-center items-center
                font-semibold hover:cursor-pointer hover:bg-white hover:border-[#292929] duration-200 hover:shadow-md"
                onClick={() => {setOpenAddDevice(true)}}>
                    ADD A NEW DEVICE
                </div>
                <div className='flex flex-col'>
                    {deviceName.map((item, index) => (
                        <div className='h-fit flex flex-col py-4 px-5 sm:mb-3 lg:mb-2 bg-white border border-solid
                            border-[#ccced1] hover:cursor-pointer rounded-md sm:ml-2 lg:ml-0 hover:border-[#292929]
                            duration-200 hover:shadow-lg'
                            onClick={() => setIdDevice([field[index], index])}
                            key={index}>
                            <div className='flex mb-1'>
                                <div className='mr-1 font-semibold'>Device:</div>
                                <div>{item}</div>
                            </div>
                            <div className='flex'>
                                <div className='mr-1 font-semibold'>WiFi:</div>
                                <div>{wifiName[index]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default NavigationBar