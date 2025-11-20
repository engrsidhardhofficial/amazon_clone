import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Payment from './pages/Payment';
import { useStateValue } from './context/StateProvider';
import { supabase } from './supabase';

function App() {
    const [{ }, dispatch] = useStateValue();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch({
                    type: 'SET_USER',
                    user: session.user
                })
            }
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("THE USER IS >>> ", session);
            if (session) {
                dispatch({
                    type: 'SET_USER',
                    user: session.user
                })
            } else {
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })

        return () => subscription.unsubscribe();
    }, [])

    return (
        <Router>
            <div className="app bg-gray-100 min-h-screen">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<><Navbar /><Checkout /></>} />
                    <Route path="/payment" element={<><Navbar /><Payment /></>} />
                    <Route path="/" element={<><Navbar /><Home /></>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
