/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { Card, Col, Row, Button, Empty, Typography, message } from 'antd';
import { useCart } from '../components/context/CartContext';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const CartPage = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    // Checking authentication status
    useEffect(() => {
        console.log('User authenticated:', isAuthenticated);
        console.log('Cart:', cart);
    }, [isAuthenticated, cart]);

    // Calculate total amount in cart
    const totalAmount = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // user is not authenticated, show a message instead of the cart
    if (!isAuthenticated) {
        return (
            <div style={{ padding: '20px 50px', textAlign: 'center' }}>
                <Title level={3}>Please log in to view your cart.</Title>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <Title level={2}>Your Cart</Title>
            {cart.length === 0 ? (<Empty description="No items in cart" />) : (
                <>
                    <Row gutter={16}>
                        {cart.map((product) => (
                            <Col span={6} key={product.id} style={{ marginBottom: '20px' }}>
                                <Card hoverable cover={<img alt={product.title} src={product.image} style={{ height: '200px', objectFit: 'contain' }} />}
                                    actions={[
                                        <Button type="primary" onClick={() => increaseQuantity(product.id)}>+</Button>,
                                        <Button type="primary" onClick={() => decreaseQuantity(product.id)}>-</Button>,
                                        <Button type="primary" onClick={() => removeFromCart(product.id)}>Remove</Button>
                                    ]}
                                >
                                    <Card.Meta
                                        title={product.title}
                                        description={`$${product.price} x ${product.quantity}`}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Title level={3}>Total Amount: ${totalAmount.toFixed(2)}</Title>
                        <Button type="primary" style={{ marginTop: '10px' }} >
                            Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
