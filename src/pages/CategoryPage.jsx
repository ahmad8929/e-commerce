import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the products:', error);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
            <Row gutter={16}>
                {products.map((product) => (
                    <Col span={6} key={product.id} style={{ marginBottom: '20px' }}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card
                                hoverable
                                cover={<img alt={product.title} src={product.image} style={{ height: '200px', objectFit: 'contain' }} />}
                                style={{ margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            >
                                <Card.Meta title={product.title} description={`$${product.price}`} />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CategoryPage;
