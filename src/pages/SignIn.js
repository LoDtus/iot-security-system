import '../App.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { getDatabase, ref, onValue, update } from "firebase/database";

function SignIn({database, setUsername}) {
    const navigate = useNavigate();
    const listUsername = useRef([]);
    const listPassword = useRef([]);
    const [usernameInp, setUsernameInp] = useState('');
    const [passwordInp, setPasswordInp] = useState('');
    const [remember, setRemember] = useState(false);
    const savedUser = useRef(null);
    
    // Lấy dữ liệu listUsername và listPassword:
    useEffect(() => {
        const db = database;
        const dataUser = ref(db, "users");
        const unsubscribe = onValue(dataUser, (snapshot) => {
            const temp = snapshot.val();
            listUsername.current = []
            listPassword.current = []
            listUsername.current = Object.keys(temp);
            for (let field of listUsername.current) {
                listPassword.current.push(temp[field].password);
            }
        });
        return () => unsubscribe();
    }, [database]);

    // Kiểm tra Username và Password:
    function validate() {
        let i;
        // Kiểm tra trường Username có rỗng hay không
        if (usernameInp === "") {
            alert("Username is not allow Null!");
            return;
        } else {
            i = listUsername.current.indexOf('username-' + usernameInp);
        }

        // Nếu không rỗng thì xem có đúng Username và mật khẩu hay không
        if (i === -1) {
            alert("Wrong Username!");
        } else {
            if (listPassword.current[i] !== passwordInp) {
                alert("Wrong Password!");
            } else { // Nếu đúng cả 2
                setUsername(`username-${usernameInp}`);

                const userData = {
                    'username': usernameInp,
                    'password': passwordInp
                }
                if (remember) {
                    // localStorage.setItem('user', JSON.stringify(userData));
                    sessionStorage.setItem('user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }
                navigate(`/${usernameInp}`);
            }
        }
    }
    
    return (
        <div className='signin flex flex-col justify-center items-center h-[100vh]'>
            <img src="./assets/background.gif" alt=""
                className='z-0 fixed top-0 left-0 h-full w-full blur-[3px]'
            />
            <div className='relative bottom-12 z-10'>
                <div className="signin-form flex flex-col bg-white p-6 z-20 rounded-md shadow-lg">
                    <span className='flex justify-center font-xl font-bold mb-4 text-2xl'>Sign In</span>
                    <div className="flex mb-1 items-center">
                        <label className='w-[100px]' htmlFor="username-signin">Username: </label>
                        <input type="text" name="username-signin" id="username-signin"
                            className='bg-[#e9ebee] grow px-2 py-1' onBlur={(event) => setUsernameInp(event.target.value)}
                        />
                    </div>
                    <div className="flex mb-1">
                        <label className='w-[100px]' htmlFor="password-signin">Password: </label>
                        <input type="password" name="password-signin" id="password-signin"
                            className='bg-[#e9ebee] grow px-2 py-1' onBlur={(event) => setPasswordInp(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center mb-2 h-8 ">
                        <div className="grow flex items-center">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='h-4 w-4 mr-1'
                                onChange={(event) => setRemember(event.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className='text-[#0b57d4] duration-200 active:scale-90'>Forgot Password?</button>
                    </div>
                
                    <button 
                        className='p-3 w-full text-white bg-[#0b57d4] font-semibold hover:cursor-pointer hover:bg-[#377ff3]
                        rounded-md mb-2 duration-200 active:scale-90'
                        onClick={() => validate()}>
                        Sign In
                    </button>
                    <div>
                        <span>Don't have an account?</span>
                        <Link to="/signUp">
                            <span className='text-[#0b57d4] ml-2 hover:text-[#377ff3] duration-200 active:scale-90'>Create an account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;