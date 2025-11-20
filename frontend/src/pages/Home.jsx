import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import axios from '../axios';

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

    return (
        <div className="bg-gray-100">
            <Hero />

            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto -mt-10 z-20 relative">
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
                </div>
            </div>
        </div>
    );
};

export default Home;
