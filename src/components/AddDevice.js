import '../App.css'
import { connectDevice } from '../utils/utils'
import { useState, useEffect } from 'react'
import { ref, onValue, push } from "firebase/database";

function AddDevice({database, username, openAddDevice, setOpenAddDevice}) {
    // Lấy ra thời gian hiện tại dưới định dạng ddMMyyyy-hhmmss
    function getCurrentDateTime() {
        const now = new Date();
    
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
    
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        const formattedDateTime = `${day}${month}${year}-${hours}${minutes}${seconds}`;
        return formattedDateTime;
    }

    const [deviceID, setDeviceID] = useState(-1);
    useEffect(() => {
        const dataUser = ref(database, `users/${username}/`);
        const unsubscribe = onValue(dataUser, (snapshot) => {
            const temp = snapshot.val();
            let list = Object.keys(temp);
            for (let i=0; i<list.length; i++)
                if (list[i].includes('device'))
                    setDeviceID(Math.floor(list[i].slice(7)))
        });
        return () => unsubscribe();
    }, [database]);

    // Gửi thông tin tới thiết bị:
    const [wifiName, setWifiName] = useState('');
    const [wifiPw, setWifiPw] = useState('');
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(null);
        setValue({
            username: username.slice(9),
            deviceId: (deviceID + 1).toString(),
            wfName: wifiName,
            wfPassword: wifiPw
        })
    }, [wifiName, wifiPw]);

	let deviceBLE, characteristicBLE;
    function pushValue() {
        push(ref(database, `users/${username}/device-${deviceID + 1}`), {
            history: [
                {[getCurrentDateTime()]: "History started!"}
            ],
            setting: {
                deviceName: "New Device",
                wifiName: wifiName,
                wifiPassword: wifiPw
            },
            status: {
                alarm: 0,
                door: 0,
                'hc-sr04': 0,
                'mc-38': 0,
                notification: 0,
                rfid: [],
                system: 0
            }
        }).then(() => {
            console.log("Record added successfully");
        })
        .catch((error) => {
            console.error("Error adding record: ", error);
        });
    }
    function sendValue() {
        connectDevice(deviceBLE, characteristicBLE, value, pushValue);
    }

    return (
        <div className={openAddDevice ? 'absolute flex flex-col justify-center items-center h-[100vh]' : 'hidden'}>
            <div className='z-0 fixed top-0 left-0 h-full w-full bg-[#6a6a6a] opacity-70'
                onClick={() => setOpenAddDevice(false)}></div>

            <div className='relative bottom-12 z-10 w-full flex justify-center h-full'>
                <div className='flex flex-col bg-white p-6 z-20 rounded-lg shadow-lg h-fit'>
                    <div className='flex items-center mb-2'>
                        <div className='basis-[5%] bg-black text-white font-semibold flex justify-center items-center rounded-full
                            aspect-square mr-2 h-6'>1</div>
                        <div className='flex flex-col w-full'>
                            <span className='font-semibold'>Complete information for new device</span>
                            <div className='w-full'>
                                <div className='flex items-center mt-1'>
                                    <div className='basis-[25%]'>WiFi Name:</div>
                                    <input className='border rounded-sm py-1 px-2' type="text" name="" id="" 
                                        onInput={(e) => setWifiName(e.target.value)}
                                    />
                                </div>
                                <div className='flex items-center mt-1'>
                                    <div className='basis-[25%]'>WiFi Password:</div>
                                    <input className='border rounded-sm py-1 px-2' type="text" name="" id="" 
                                        onInput={(e) => setWifiPw(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border flex justify-center'></div>

                    <div className='flex items-center my-2'>
                        <div className='basis-[5%] bg-black text-white font-semibold flex justify-center items-center rounded-full
                            aspect-square mr-2 h-6'>2</div>
                        <div className=''>Power up the security system, move this device close to the system</div>
                    </div>
                    <div className='border flex justify-center'></div>

                    <div className='flex items-center my-2'>
                        <div className='basis-[5%] bg-black text-white font-semibold flex justify-center items-center rounded-full
                            aspect-square mr-2 h-6'>3</div>
                        <div className=''>Turn on Bluetooth for this device</div>
                    </div>
                    <div className='border flex justify-center'></div>

                    <div className='flex items-center my-2'>
                        <div className='basis-[5%] bg-black text-white font-semibold flex justify-center items-center rounded-full
                            aspect-square mr-2 h-6'>4</div>
                        <div className='basis-[60%]'>Choose Your Device</div>
                        <button className='py-2 px-2 bg-[#4fbe79] rounded-md text-white duration-200 font-semibold active:scale-90
                            hover:bg-[#74ce96] w-full'
                            onClick={() => sendValue()}>Connect</button>
                    </div>
                    <div className='border flex justify-center'></div>

                    <div className='flex items-center mt-2'>
                        <div className='basis-[5%] bg-black text-white font-semibold flex justify-center items-center rounded-full
                            aspect-square mr-2 h-6'>5</div>
                        <div className='basis-[60%]'>Done!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddDevice;