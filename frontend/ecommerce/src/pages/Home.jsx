import React from 'react';
import ProductList from '../compinents/ProductList';
import ProductNew from '../compinents/ProductNew';
import ProductHot from '../compinents/ProductNew';


export default function Home() {
    return (
        <>
            <ProductList />
            <ProductHot />
        </>
    );
}
