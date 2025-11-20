import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "../components/CheckoutProduct";
import { useStateValue } from "../context/StateProvider";
import { getBasketTotal } from "../context/reducer";

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/orders', {
                email: user ? user.email : 'guest@example.com',
                amount: getBasketTotal(basket),
                items: basket
            });

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/', { replace: true })
            alert("Order Placed Successfully!");
        } catch (error) {
            console.error(error);
            alert("Error placing order");
        }
    }

    return (
        <div className='bg-white'>
            <div className='text-center bg-gray-100 p-2 border-b border-gray-300'>
                <h1 className="text-3xl font-medium">
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
            </div>

            <div className='flex p-5 mx-5 border-b border-gray-200'>
                <div className='flex-[0.2]'>
                    <h3 className="font-bold">Delivery Address</h3>
                </div>
                <div className='flex-[0.8]'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>

            <div className='flex p-5 mx-5 border-b border-gray-200'>
                <div className='flex-[0.2]'>
                    <h3 className="font-bold">Review items and delivery</h3>
                </div>
                <div className='flex-[0.8]'>
                    {basket.map(item => (
                        <CheckoutProduct
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className='flex p-5 mx-5 border-b border-gray-200'>
                <div className="flex-[0.2]">
                    <h3 className="font-bold">Payment Method</h3>
                </div>
                <div className="flex-[0.8]">
                    <div className='mt-5'>
                        <div className="font-bold mb-5">
                            Order Total: ${getBasketTotal(basket).toFixed(2)}
                        </div>
                        <button onClick={handleSubmit} className="bg-amazon-yellow rounded-sm w-full h-8 border border-yellow-500 hover:bg-yellow-500 font-bold text-sm">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
