import { useState, useEffect } from 'react'
import '../App.css'
import BatteryCapacity from '../components/BatteryCapacity'
import { ref, onValue, update, remove } from "firebase/database";
import ControlPannel from '../components/ControlPannel';
import Setting from '../components/Setting';
import { connectDevice } from '../utils/utils'

function Dashboard({database, username, idDevice, deviceName, wifiName, openRFID, setOpenRFID}) {    
    // Get dữ liệu từ Firebase về
    const [switchState, setSwitchstate] = useState([]);
    const [history, setHistory] = useState([]);
    const [wifiPassword, setWifiPassword] = useState(null);
    const [rfid, setRfid] = useState('');
    useEffect(() => {
        // if (idDevice.length > 0) {
            const db = database;
            const dataUser = ref(db, `users/${username}/${idDevice}/`);
            const unsubscribe = onValue(dataUser, (snapshot) => {
                const temp = snapshot.val();
                if (temp && temp.status && temp.history) {
                    setWifiPassword(temp.setting.wifiPassword)
                    setRfid(temp.status.rfid.uid);
                    setSwitchstate([
                        temp.status.door,
                        temp.status.system,
                        temp.status.notification,
                        temp.status.alarm,
                        temp.status['mc-38'],
                        temp.status['hc-sr04']
                    ]);
    
                    setHistory([])
                    let listHis = Object.keys(temp.history).slice().reverse()  
                    for (let i=0; i<listHis.length; i++) {
                        setHistory(prevState => {
                            let tempList = [...prevState];
                            tempList.push(temp.history[`${listHis[i]}`])
                            return tempList;
                        })
                    }
                }
            });
            return () => unsubscribe();
        // }
    }, [database, idDevice]);

    // Control Pannel: --------------------------------------------
    const [button, setButton] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(['', null]);
    const listSwitch = ['door', 'system', 'notification', 'alarm', 'mc-38', 'hc-sr04'];
    function handleSwitch(index) { // Handle Button/Checkbox
        if (index === 1) {
            setSwitchstate(prevState => {
                let tempSwitchState = [...prevState];
                tempSwitchState[index] = !tempSwitchState[index];
                tempSwitchState[2] = !tempSwitchState[index];
                tempSwitchState[3] = !tempSwitchState[index];
                tempSwitchState[4] = !tempSwitchState[index];
                tempSwitchState[5] = !tempSwitchState[index];
                return tempSwitchState
            })
            setDataUpdate([listSwitch[index], index]);
            setButton(!button);
        } else if (index !== 1 && index !== null) {
            setSwitchstate(prevState => {
                    let tempSwitchState = [...prevState];
                    tempSwitchState[index] = !tempSwitchState[index];
                    return tempSwitchState
                }
            )
            setDataUpdate([listSwitch[index], index]);
            setButton(!button);
        }
    }

    // Update dữ liệu Control Pannel lên Firebase
    useEffect(() => {
        if (dataUpdate[0] === undefined || switchState[dataUpdate[1]] === undefined) {
            return
        }
        if (dataUpdate[0] === "system") {
            update(ref(database, `users/${username}/${idDevice}/status`), {
                [dataUpdate[0]]: switchState[dataUpdate[1]],
            });
            update(ref(database, `users/${username}/${idDevice}/status`), {
                'notification': switchState[dataUpdate[1]],
            });
            update(ref(database, `users/${username}/${idDevice}/status`), {
                'alarm': switchState[dataUpdate[1]],
            });
            update(ref(database, `users/${username}/${idDevice}/status`), {
                'mc-38': switchState[dataUpdate[1]],
            });
            update(ref(database, `users/${username}/${idDevice}/status`), {
                'hc-sr04': switchState[dataUpdate[1]],
            });
        } else {
            update(ref(database, `users/${username}/${idDevice}/status`), {
                [dataUpdate[0]]: switchState[dataUpdate[1]],
            });
        }
    }, [button]);

    // Setting: -------------------------------------
    useEffect(() => {
        if (openRFID) {
            update(ref(database, `users/${username}/${idDevice}/status/rfid`), {
                'add': true,
            });
        } else {
            update(ref(database, `users/${username}/${idDevice}/status/rfid`), {
                'add': false,
            });
        }
    }, [openRFID]);

    useEffect(() => {
        setOpenRFID(false);
    }, [rfid])

    const [newDeviceName, setNewDeviceName] = useState('');
    const [newWfName, setNewWfName] = useState('')
    const [newWfPassword, setNewWfPassword] = useState('')
    function saveInfo() {        
        if (newDeviceName !== deviceName && newDeviceName.length !== 0) {
            update(ref(database, `users/${username}/${idDevice}/setting`), {
                deviceName: newDeviceName,
            });
        }
        if (newWfName !== wifiName && newWfName.length !== 0) {
            let deviceBLE, characteristicBLE;
            connectDevice(deviceBLE, characteristicBLE, {
                wfName: newWfName,
                wfPassword: wifiPassword,
                username: username.slice(9),
                deviceId: idDevice
            }, update(ref(database, `users/${username}/${idDevice}/setting`), {
                wifiName: newWfName,
            }));
        }
        if (newWfPassword !== wifiPassword && newWfPassword.length !== 0) {
            let deviceBLE, characteristicBLE;
            connectDevice(deviceBLE, characteristicBLE, {
                wfName: wifiName,
                wfPassword: newWfPassword,
                username: username.slice(9),
                deviceId: idDevice
            }, update(ref(database, `users/${username}/${idDevice}/setting`), {
                wifiPassword: newWfPassword,
            }));
        } 
    }

    return (
        <div className="dashboard h-[85vh] basis-[80%] flex">
            <div className='flex flex-col basis-[70%]'>
                <div className="flex">
                    {/* Control Pannel */}
                    <ControlPannel
                        switchState={switchState}
                        handleSwitch={handleSwitch}
                    />

                    {/* Battery Capacity */}
                    <div className='w-full flex flex-col items-center basis-[40%] shadow-lg rounded-lg border my-2 p-2 bg-white'>
                        <div className='font-semibold text-2xl'>Battery Capacity</div>
                        <BatteryCapacity
                            percent={1}
                        />
                    </div>
                </div>

                {/* History */}
                <div className='border h-full bg-white ml-2 rounded-lg shadow-lg py-5 flex flex-col'>
                    <div className='text-2xl font-semibold mb-3 px-8'>History</div>
                    <div className='max-h-[27vh] overflow-y-auto px-8'>
                        {history.map((item, index) => (
                            <div className='border-b pb-2 mb-2' key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Setting */}
            <Setting
                deviceName={deviceName}
                wifiName={wifiName}
                wifiPassword={wifiPassword}
                setNewDeviceName={setNewDeviceName}
                setNewWfName={setNewWfName}
                setNewWfPassword={setNewWfPassword}
                setOpenRFID={setOpenRFID}
                saveInfo={saveInfo}
                rfid={rfid}
            />
        </div>
    )
}
export default Dashboard