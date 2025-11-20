import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { getBasketTotal } from '../context/reducer';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className="flex flex-col justify-between w-full h-36 p-5 bg-gray-100 border border-gray-300 rounded-md">
            <p>
                Subtotal ({basket.length} items): <strong>${getBasketTotal(basket).toFixed(2)}</strong>
            </p>
            <small className="flex items-center mt-1">
                <input type="checkbox" className="mr-1" /> This order contains a gift
            </small>

            <button onClick={e => navigate('/payment')} className="bg-amazon-yellow rounded-sm w-full h-8 border border-yellow-500 mt-4 hover:bg-yellow-500 text-sm">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Subtotal;
