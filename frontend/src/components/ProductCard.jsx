import React from 'react';
import { Star } from 'lucide-react';
import { useStateValue } from '../context/StateProvider';

const ProductCard = ({ id, title, price, description, category, image, rating }) => {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 flex-grow shadow-md hover:scale-105 transition-transform duration-200">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

            <div className="h-48 flex items-center justify-center mb-4">
                <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
            </div>

            <h4 className="my-3 font-medium line-clamp-2">{title}</h4>

            <div className="flex">
                {Array(rating).fill().map((_, i) => (
                    <Star key={i} className="h-5 text-yellow-500 fill-current" />
                ))}
            </div>

            <p className="text-xs my-2 line-clamp-2">{description}</p>

            <div className="mb-5">
                <p className="text-lg font-bold">${price}</p>
            </div>

            <button onClick={addToBasket} className="mt-auto button bg-amazon-yellow border border-yellow-500 rounded-sm py-2 px-4 focus:outline-none hover:bg-yellow-500 font-bold">
                Add to Basket
            </button>
        </div>
    );
};

export default ProductCard;
