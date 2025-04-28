import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SlidingWindow from './account';
import { scroller } from 'react-scroll';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleProductClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to Home, then scroll
            setTimeout(() => {
                scroller.scrollTo('products-section', {
                    smooth: true,
                    duration: 400,
                });
            }, 100);
        } else {
            scroller.scrollTo('products-section', {
                smooth: true,
                duration: 400,
            });
        }
    };

    return (
        <>
            <Menu mode="horizontal" theme="dark" className="custom-navbar">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="shop" icon={<ShopOutlined />} onClick={handleProductClick}>
                    Products
                </Menu.Item>
                <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                    <Link to="/cart">Cart</Link>
                </Menu.Item>
                <Menu.Item key="account" icon={<UserOutlined />} onClick={showDrawer}>
                    Account
                </Menu.Item>
            </Menu>
            <SlidingWindow visible={visible} onClose={onClose} />
        </>
    );
};

export default Navbar;
