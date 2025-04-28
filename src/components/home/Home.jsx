import React from 'react';
import Slider from './Slider';
import Categories from './Categories';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

const Home = ({ products, loading }) => {
    const { addToCart } = useCart();

    return (
        <div>
            <Slider />
            <Categories />
            <div id="products-section">
                <ProductList products={products} loading={loading} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default Home;
