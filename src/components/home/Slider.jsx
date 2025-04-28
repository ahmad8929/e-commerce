import React, { useEffect, useState } from 'react';
import { Carousel, Spin, Card } from 'antd';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=5')
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

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ margin: '20px 0' }}>
            <Carousel autoplay autoplaySpeed={2000}>
                {products.map((product) => (
                    <div key={product.id}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card
                                hoverable
                                cover={<img alt={product.title} src={product.image} style={{ height: '300px', objectFit: 'contain' }} />} >
                                <Card.Meta title={product.title} description={`$${product.price}`} />
                            </Card>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
