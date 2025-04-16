import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductNew() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
                // console.log('Full response:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    // console.log(products);

    const hotProducts = products.filter(product => product.hot == true)
    return (
        <>
            {hotProducts && (
                <div className="bg-neutral-200 mx-auto max-w-2xl mx-4 my-16 sm:px-6 py-5 sm:my-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Discover HOT Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {hotProducts.map((hotProduct) => (
                            <div
                                key={hotProduct.id}
                                onClick={() => navigate(`/product/${hotProduct.id}`)}
                                className="border border-gray-300 group relative bg-white p-2 rounded-md hover:shadow-lg transition"
                            >
                                <img
                                    alt={hotProduct.name}
                                    src={hotProduct.image_url}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 cursor-pointer"
                                />

                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-md text-gray-700 font-semibold">
                                            <p className="absolute" />
                                            {hotProduct.name} <br /> <span className='text-sm text-gray-400'>{hotProduct.brand}</span>
                                        </h3>

                                        <div className="flex gap-2 mt-2">
                                            <span className="bg-red-200 text-red-800 px-2 py-1 text-xs rounded-full font-semibold">
                                                HOT 🔥
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-md font-medium text-gray-900 pt-3">${hotProduct.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
