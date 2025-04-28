import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Row, Col, Button, InputNumber, message } from 'antd';
import { useCart } from '../components/context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product, quantity);
            message.success(`Added ${product.title} to the cart!`);
        } else {
            message.error('Quantity must be greater than zero.');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <Row gutter={26}>
                <Col span={8}>
                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
                </Col>
                <Col span={16}>
                    <Card title={product.title}>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <div style={{ marginTop: '10px' }}>
                            <InputNumber
                                min={1}
                                value={quantity}
                                onChange={setQuantity}
                                style={{ marginRight: '10px' }}
                            />
                            <Button type="primary" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;


