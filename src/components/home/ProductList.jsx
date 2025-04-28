/* eslint-disable react/jsx-key */
import React from 'react';
import { Card, Row, Col, Spin, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductList = ({ products, loading }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        message.success(`Added ${product.title} to the cart!`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <Row gutter={16}>
                {products.map((product) => (
                    <Col span={6} key={product.id} style={{ marginBottom: '20px' }}>
                        <Card
                            hoverable
                            cover={
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <img
                                        alt={product.title}
                                        src={product.image}
                                        style={{ height: '200px', objectFit: 'contain', width: '100%' }}
                                    />
                                </Link>
                            }
                            style={{ margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            actions={[
                                <Button
                                    type="primary"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            ]}
                        >
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <Card.Meta title={product.title} description={`$${product.price}`} />
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
