import React from 'react';
import { useStateValue } from '../context/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';
import Subtotal from '../components/Subtotal';

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="flex p-5 bg-white h-max">
            <div className="flex-grow mr-5">
                <img
                    className="w-full mb-2"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />

                <div>
                    <h3 className="mr-2 p-2 border-b border-gray-300">Hello, {user?.email}</h3>
                    <h2 className="mr-2 p-2 border-b border-gray-300 text-2xl font-bold">Your Shopping Basket</h2>

                    {basket.map((item, i) => (
                        <CheckoutProduct
                            key={i} // Use index as key for now since we might have duplicates
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                </div>
            </div>

            <div className="w-1/4">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;
