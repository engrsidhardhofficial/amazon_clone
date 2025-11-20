import React from 'react';
import { Star } from 'lucide-react';
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion';

const ProductCard = ({ id, title, price, description, category, image, rating }) => {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: { id, title, image, price, rating },
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col m-5 glass-panel z-30 p-8 flex-grow rounded-xl overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <p className="absolute top-4 right-4 text-xs italic text-neon-blue">{category}</p>

            <div className="h-48 flex items-center justify-center mb-6 relative z-10">
                <img src={image} alt={title} className="max-h-full max-w-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </div>

            <h4 className="my-3 font-medium text-lg line-clamp-2 text-white group-hover:text-neon-blue transition-colors">{title}</h4>

            <div className="flex mb-2">
                {Array(rating).fill().map((_, i) => (
                    <Star key={i} className="h-4 text-neon-purple fill-current" />
                ))}
            </div>

            <p className="text-xs my-2 line-clamp-3 text-gray-400">{description}</p>

            <div className="mt-auto pt-4">
                <p className="text-2xl font-bold text-white mb-4">${price}</p>
                <button onClick={addToBasket} className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold py-2 px-4 rounded-full hover:shadow-[0_0_20px_rgba(188,19,254,0.5)] transition-all duration-300 transform active:scale-95">
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
