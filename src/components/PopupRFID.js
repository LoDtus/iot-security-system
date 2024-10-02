import '../App.css'
import { useState, useEffect } from 'react'
import { database } from '../config/firebase';

function PopupRFID({openRFID, setOpenRFID}) {
    // useEffect(() => {
    //     // Nếu quét được thẻ RFID mới thì đóng
    //     alert("New RFID Tag saved successfully!");
    // });

    return (
        <div className={openRFID ? 'absolute flex flex-col justify-center items-center h-[100vh]' : 'hidden'}>
            <div className='z-0 fixed top-0 left-0 h-full w-full bg-[#6a6a6a] opacity-70'
                onClick={() => setOpenRFID(false)}></div>

            <div className='relative bottom-12 z-10 w-full flex justify-center h-full'>
                <div className='flex bg-[#4fbe79] p-6 z-20 rounded-lg shadow-lg items-center w-[60%] h-fit'>
                    <svg className='fill-white w-[100px] mr-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/>
                    </svg>
                    <div>                
                        <span className='font-bold text-xl flex justify-center'>Scan your RFID Tag!</span>
                        <div className='text-white'>Place your RFID card close to the lock so the system can recognize it.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopupRFID;