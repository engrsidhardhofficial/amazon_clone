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
        <nav className="bg-amazon-default text-white sticky top-0 z-50">
            <div className="flex items-center p-2 flex-grow">
                {/* Logo */}
                <Link to="/">
                    <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 mx-2 cursor-pointer">
                        <span className="text-2xl font-bold tracking-tighter px-2">amazon</span>
                        <span className="text-xs mb-4 -ml-1">.clone</span>
                    </div>
                </Link>

                {/* Search */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-amazon-yellow hover:bg-yellow-500">
                    <input
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 text-black"
                        type="text"
                        placeholder="Search Amazon Clone"
                    />
                    <Search className="h-12 p-4" />
                </div>

                {/* Right Side */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <Link to={!user && '/login'} className="link cursor-pointer">
                        <div onClick={handleAuthentication}>
                            <p>Hello, {user ? user.email : 'Sign in'}</p>
                            <p className="font-extrabold md:text-sm">{user ? 'Sign Out' : 'Account & Lists'}</p>
                        </div>
                    </Link>
                    <div className="link cursor-pointer">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <Link to="/checkout" className="relative link flex items-center cursor-pointer">
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazon-yellow text-center rounded-full text-black font-bold">
                            {basket?.length}
                        </span>
                        <ShoppingCart className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    </Link>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center bg-amazon-light_blue text-white text-sm p-2 pl-6 space-x-3">
                <p className="link flex items-center cursor-pointer">
                    <Menu className="h-6 mr-1" />
                    All
                </p>
                <p className="link cursor-pointer">Prime Video</p>
                <p className="link cursor-pointer">Amazon Business</p>
                <p className="link cursor-pointer">Today's Deals</p>
            </div>
        </nav>
    );
};

export default Navbar;
