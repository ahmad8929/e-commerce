import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the categories:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 50px' }}>
            <h2>Product Categories</h2>
            <Row gutter={16}>
                {categories.map((category, index) => (
                    <Col span={6} key={index}>
                        <Link to={`/category/${category}`}>
                            <Card hoverable>
                                <Card.Meta title={category.charAt(0).toUpperCase() + category.slice(1)} />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Categories;
