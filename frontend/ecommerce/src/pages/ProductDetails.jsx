import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductHot from '../compinents/ProductNew';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    // console.log(product);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
            setProduct(response.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <div className="bg-white flex flex-col lg:flex-row p-4 sm:p-6 md:p-10 my-10 sm:my-16 md:my-20 mx-4 sm:mx-10 md:mx-20 rounded-lg shadow-md gap-6">
                <div className="flex-shrink-0 flex justify-center">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full sm:w-80 md:w-96 h-auto object-cover rounded-md"
                    />
                </div>

                <div className="flex flex-col justify-between w-full text-center lg:text-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-700 text-lg">{product.description}</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-2xl font-bold text-green-700 mb-4">${product.price}</p>
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <ProductHot />
        </>
    );
}
