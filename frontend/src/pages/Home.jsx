import React, { useState, useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import ProductCard from '../components/ProductCard';
import axios from '../axios';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('/products');
            setProducts(request.data);
            return request;
        }
        fetchData();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-dark-bg min-h-screen">
            <Hero3D />

            <div className="max-w-screen-2xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-neon-blue pl-4">
                    Trending Products
                </h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            category={product.category}
                            image={product.image}
                            rating={product.rating}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
