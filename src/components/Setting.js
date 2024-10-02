function Setting({deviceName, wifiName, wifiPassword, setNewDeviceName, setNewWfName, setNewWfPassword, setOpenRFID, saveInfo, rfid, deleteRfid_byID}) {
    return (
        <div className="w-full flex flex-col basis-[30%] shadow-lg rounded-lg border mt-2 ml-2 p-2 bg-white">
            <div className='grow'>
                <div className='font-semibold text-2xl w-full flex justify-center mb-3'>Setting</div>
                <div className='flex mb-2 mx-3'>
                    <label className='basis-[40%] text-lg text-[#292929] font-medium' htmlFor="">Device Name</label>
                    <input className='basis-[60%] w-full ml-2 rounded-md py-1 px-2 bg-[#f2f3f5] text-[#292929] outline-[#bfbfbf]'
                        type="text" placeholder={deviceName}
                        onBlur={(e) => setNewDeviceName(e.target.value)}
                        />
                </div>
                <div className='flex mb-2 mx-3'>
                    <label className='basis-[40%] text-lg text-[#292929] font-medium' htmlFor="">WiFi Name</label>
                    <input className='basis-[60%] w-full ml-2 rounded-md py-1 px-2 bg-[#f2f3f5] text-[#292929] outline-[#bfbfbf]'
                        type="text" placeholder={wifiName}
                        onBlur={(e) => setNewWfName(e.target.value)}
                        />
                </div>
                <div className='flex mb-2 mx-3'>
                    <label className='basis-[40%] text-lg text-[#292929] font-medium' htmlFor="">WiFi Password</label>
                    <input className='basis-[60%] w-full ml-2 rounded-md py-1 px-2 bg-[#f2f3f5] text-[#292929] outline-[#bfbfbf]'
                        type="text" placeholder={wifiPassword}
                        onBlur={(e) => setNewWfPassword(e.target.value)}
                        />
                </div>

                <div className='font-semibold text-2xl w-full flex justify-center mb-3 mt-8'>RFID</div>
                <div className='flex py-1 bg-[#f5f7f9] border rounded-md'>
                    <div className='basis-[10%] font-semibold flex justify-center px-5 w-[20px]'>No</div>
                    <div className='basis-[70%] font-semibold flex justify-center px-5'>UID</div>
                    <div className='basis-[20%] font-semibold flex justify-center px-5'>Delete</div>
                </div>
                {
                    rfid.map((e, i) => (
                        <div key={i} className='flex py-1 border-b items-center'>
                            <div className='basis-[10%] flex justify-center px-5 w-[20px]'>{i+1}</div>
                            <div className='basis-[70%] flex justify-center px-5'>{e}</div>
                            <div
                                className='basis-[20%] font-semibold flex justify-center bg-[#ed5e68] py-1 px-5 rounded-md text-white
                                hover:cursor-pointer hover:bg-[#f8777f] duration-200 active:scale-90'
                                onClick={() => deleteRfid_byID(i)}>
                                Delete
                            </div>
                        </div>
                    ))
                }
                <div className='w-full flex justify-center mt-2'>
                    <button 
                        onClick={() => setOpenRFID(true)}
                        className='border rounded-md py-1 px-5 mb-2 bg-[#4fbe79] font-semibold text-white
                        duration-200 hover:bg-[#76d79b] active:scale-90'>Add more RFID Tag</button>
                </div>
            </div>
            <div className='flex w-full justify-center'>
                <div
                    className='flex justify-center items-center w-fit py-2 px-5 bg-[#00acc1] text-white font-semibold rounded-md
                    hover:cursor-pointer hover:bg-[#3ebfd0] duration-200 active:scale-90'
                    onClick={() => saveInfo()}>
                    Save
                </div>
            </div>
        </div>
    )
}
export default Setting;