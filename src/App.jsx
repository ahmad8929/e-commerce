import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './components/context/CartContext';

const { Header, Content } = Layout;

const App = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <CartProvider>
      <Router>
        <Layout>
          <Header>
            <Navbar />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Routes>
              <Route path="/" element={<Home products={products} loading={loading} />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
