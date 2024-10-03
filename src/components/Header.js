import '../App.css'
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate();

    function signOut() {
        const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (savedUser) {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            navigate('/');
        }
    }

    return (
        <header className="flex">
            <div className="container-header w-full flex justify-between items-center pl-4 py-4 mb-2 font-semibold text-2xl">
                <div className='title'>Project: Security System IOT</div>
                <button className='px-8 rounded-md border title text-white bg-[#dd2c00] mr-3
                    duration-200 hover:bg-[#ed7c60] active:scale-90'
                    onClick={() => signOut()}>
                    Sign Out
                </button>
            </div>
        </header>
    )
}
export default Header;