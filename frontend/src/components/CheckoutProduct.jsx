import React from 'react';
import { Star } from 'lucide-react';
import { useStateValue } from '../context/StateProvider';

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div className='flex my-5'>
            <img className='object-contain w-44 h-44' src={image || "https://via.placeholder.com/150"} alt="" />

            <div className='pl-5'>
                <p className='text-lg font-bold'>{title}</p>
                <p className='text-xs text-gray-500'>In Stock</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <Star key={i} className="h-5 text-yellow-500 fill-current" />
                    ))}
                </div>
                <p className="font-bold mt-2">${price}</p>

                {!hideButton && (
                    <button onClick={removeFromBasket} className='bg-amazon-yellow mt-2 border border-yellow-500 rounded-sm py-1 px-3 hover:bg-yellow-500 text-sm'>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct;
