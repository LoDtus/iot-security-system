import '../App.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ref, onValue, set } from "firebase/database";

function SignUp({database}) {
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        const db = database;
        const dataUser = ref(db, "users");
        const unsubscribe = onValue(dataUser, (snapshot) => {
            const temp = snapshot.val();
            setDataUser([])
            let fieldName = Object.keys(temp);
            for (let i=0; i<fieldName.length; i++) {
                setDataUser(prevState => {
                    let tempList = [...prevState];
                    tempList.push(fieldName[i].slice(9))
                    return tempList;
                })
            }
        });
        return () => unsubscribe();
    }, [database]);

    const [usernameInp, setUsernameInp] = useState('')
    const [emailInp, setEmailInp] = useState('')
    const [passwordInp, setPasswordInp] = useState('')
    const [repasswordInp, setRepasswordInp] = useState('')
    const navigate = useNavigate();
    function validate() {
        if (usernameInp === '') {
            alert("Username is not allow Null!")
            return;
        }
        if (emailInp === '' ) {
            alert("Email is not allow Null!")
            return;
        }
        if (passwordInp === '' ) {
            alert("Password is not allow Null!")
            return;
        }
        if (repasswordInp === '' ) {
            alert("Re-password is not allow Null!")
            return;
        }
        if (usernameInp.split(' ').length > 1) {
            alert("Invalid username!")
            return
        }
        if (usernameInp.includes(dataUser)) {
            alert("Username already exists!");
            return
        }
        if (passwordInp !== repasswordInp) {
            alert("Invalid Re-password!")
        }
        set(ref(database, `users/${usernameInp}`), {
            password: passwordInp
        }).then(() => {
            console.log("Record added successfully");
        })
        .catch((error) => {
            console.error("Error adding record: ", error);
        });
        alert("Registration successful!")
        navigate(`/${usernameInp}`)
    }

    return (
        <div className='signup flex flex-col justify-center items-center h-[100vh]'>
            <img src="./assets/background.gif" alt=""
                className='z-0 fixed top-0 left-0 h-full w-full blur-[3px]'
            />
            <div className='relative bottom-12'>
                <div className="signup-form flex flex-col bg-white p-6 z-20 rounded-sm shadow-lg">
                    <span className='flex justify-center font-xl font-bold mb-4 text-2xl'>Sign Up</span>
                    <div className="flex mb-1">
                        <label className='w-[100px]' htmlFor="username-signup">Username: </label>
                        <input type="text" name="username-signup" id="username-signup"
                            className='bg-[#e9ebee] rounded-sm px-2 py-1 grow'
                            onBlur={(e) => setUsernameInp(e.target.value)}
                        />
                    </div>
                    <div className="flex mb-1">
                        <label className='w-[100px]' htmlFor="email-signup">Email: </label>
                        <input type="text" name="email-signup" id="email-signup"
                            className='bg-[#e9ebee] rounded-sm px-2 py-1 grow'
                            onBlur={(e) => setEmailInp(e.target.value)}
                        />
                    </div>
                    <div className="flex mb-1">
                        <label className='w-[140px]' htmlFor="password-signup">New password: </label>
                        <input type="password" name="password-signup" id="password-signup"
                            className='bg-[#e9ebee] rounded-sm px-2 py-1 grow'
                            onBlur={(e) => setPasswordInp(e.target.value)}
                        />
                    </div>
                    <div className="flex mb-1">
                        <label className='w-[140px]' htmlFor="repassword-signup">Re-enter password: </label>
                        <input type="password" name="repassword-signup" id="repassword-signup"
                            className='bg-[#e9ebee] rounded-sm px-2 py-1 grow'
                            onBlur={(e) => setRepasswordInp(e.target.value)}
                        />
                    </div>
                
                    <button 
                        className='p-3 w-full text-white bg-[#0b57d4] font-semibold hover:cursor-pointer hover:bg-[#377ff3]
                        rounded-md mb-1'
                        onClick={() => validate()}>
                        Sign Up
                    </button>
                    <div className='flex justify-center'>
                        <span>Already have an account?</span>
                        <Link to='/'>
                            <span className='text-[#0b57d4] ml-2 hover:text-[#377ff3] duration-200'>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp