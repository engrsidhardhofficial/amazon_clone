import React from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';

import { supabase } from '../supabase';

const Navbar = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = async () => {
        if (user) {
            await supabase.auth.signOut();
        }
    }

    return (
        <nav className="glass-panel text-white sticky top-0 z-50 backdrop-blur-md">
            <div className="flex items-center p-4 flex-grow">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center flex-grow sm:flex-grow-0 mx-2 cursor-pointer">
                        <span className="text-2xl font-bold tracking-tighter px-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                            amazon.clone
                        </span>
                    </div>
                </Link>

                {/* Search */}
                <div className="hidden sm:flex items-center h-10 rounded-full flex-grow cursor-pointer bg-gray-800 border border-gray-700 hover:border-neon-blue transition-colors mx-6">
                    <input
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-full focus:outline-none px-4 bg-transparent text-white placeholder-gray-400"
                        type="text"
                        placeholder="Search Future Store..."
                    />
                    <Search className="h-10 p-2 text-neon-blue" />
                </div>

                {/* Right Side */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <Link to={!user && '/login'} className="link cursor-pointer hover:text-neon-blue transition-colors">
                        <div onClick={handleAuthentication}>
                            <p>Hello, {user ? user.email : 'Sign in'}</p>
                            <p className="font-extrabold md:text-sm">{user ? 'Sign Out' : 'Account & Lists'}</p>
                        </div>
                    </Link>
                    <div className="link cursor-pointer hover:text-neon-blue transition-colors">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <Link to="/checkout" className="relative link flex items-center cursor-pointer hover:text-neon-purple transition-colors">
                        <span className="absolute -top-1 -right-2 h-5 w-5 bg-neon-purple text-center rounded-full text-white font-bold flex items-center justify-center">
                            {basket?.length}
                        </span>
                        <ShoppingCart className="h-8" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
