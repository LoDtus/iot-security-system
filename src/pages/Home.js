import '../App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'
import Dashboard from './Dashboard'
import { useState, useRef, useEffect } from 'react'
import { getDatabase, ref, onValue, update } from "firebase/database";
import PopupRFID from '../components/PopupRFID'
import AddDevice from '../components/AddDevice'

function Home({database, username}) {
    const [idDevice, setIdDevice] = useState([]);
    const [deviceName, setDeviceName] = useState([])
    const [wifiName, setWifiName] = useState([]);
    const [data, setData] = useState(null);
    const [field, setField] = useState([]);
    const [openRFID, setOpenRFID] = useState(false);
    const [openAddDevice, setOpenAddDevice] = useState(false);
    const url = useRef([]);

    useEffect(() => {
        const db = database;
        const dataUser = ref(db, `users/${username}/`);
        
        const unsubscribe = onValue(dataUser, (snapshot) => {
            const temp = snapshot.val();
            setData(temp);
            setField([]);
            setDeviceName([]);
            setWifiName([]);
        });
        return () => unsubscribe();
    }, [database]);

    useEffect(() => {
        if (data !== undefined && data !== null) {
            url.current = [];
            setField(Object.keys(data));
        }
    }, [data]);

    useEffect(() => {
        console.log(field);
        
        if (field.length > 0) {       
            setIdDevice([field[0], 0]);
            for (let i=0; i<field.length; i++) {
                if (field[i].includes('device-')) {
                    url.current.push(`users/${username}/` + field[i] + '/setting/');
                }
            }
            for (let i=0; i<url.current.length; i++) {
                const db = database;
                const dataUser = ref(db, url.current[i]);
                const unsubscribe = onValue(dataUser, (snapshot) => {
                    const temp = snapshot.val();
                    setDeviceName(prevState => {
                        let tempName = [...prevState];
                        tempName.push(temp.deviceName);
                        return tempName;
                    })
                    setWifiName(prevState => {
                        let tempName = [...prevState];
                        tempName.push(temp.wifiName);
                        return tempName;
                    })
                });
            } 
        } else {

        }
    }, [field]);

    return (
        <div className="home flex flex-col justify-center items-center">
            <Header/>
            <main className="flex justify-center min-h-[85vh] mb-5">
                <div className="container-main lg:flex 2xl:px-3">
                    <NavigationBar
                        setIdDevice={setIdDevice}
                        field={field}
                        deviceName={deviceName}
                        wifiName={wifiName}
                        openAddDevice={openAddDevice}
                        setOpenAddDevice={setOpenAddDevice}
                    />
                    {field.length > 1 && <Dashboard
                        database={database}
                        username={username}
                        idDevice={idDevice[0]}
                        deviceName={deviceName[idDevice[1]]}
                        wifiName={wifiName[idDevice[1]]}
                        openRFID={openRFID}
                        setOpenRFID={setOpenRFID}
                    />}
                    {field.length < 2 && <div
                        className='bg-white rounded-lg border w-full flex justify-center items-center font-semibold'>
                        Chưa có thiết bị nào được kết nối
                    </div>
                    }
                </div>
            </main>
            <Footer/>

            <PopupRFID
                openRFID={openRFID}
                setOpenRFID={setOpenRFID}
            />
            <AddDevice
                database={database}
                username={username}
                openAddDevice={openAddDevice}
                setOpenAddDevice={setOpenAddDevice}
            />
        </div>
    )
}
export default Home