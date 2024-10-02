import "./App.css";
import { Routes, Route } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home"
import { getDatabase, ref, child, get } from "firebase/database";
import { database } from './config/firebase'
import { useEffect, useState } from "react";

function App() {
    const dbRef = ref(database);
    const db = database;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUsername(userData.username);
            setPassword(userData.password);
        }
    }, []);

	return (
		<div className="App bg-[#fafafa]">
            <Routes>
                <Route path="/" 
                    element={<SignIn
                        database={db}
                        setUsername={setUsername}
                    />}
                />
                <Route path="/signUp"
                    element={<SignUp
                        database={db}
                    />}    
                />
                {username !== null && <Route path={`/${username.slice(9)}/*`}
                    element={
                    <Home
                        database={db}
                        username={username}
                    />}    
                />}
            </Routes>
		</div>
	);
}

export default App;
