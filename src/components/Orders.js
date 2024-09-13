import React from 'react';
import '../styles/orders.css'; // Ensure you have appropriate styles for Orders component

const Orders = ({ orders }) => {
    return (
        <div className="orders_container">
            <h2>Order Summary</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order_section">
                        <h3>Order ID: {order.id}</h3>
                        <div className="order_items">
                            {order.items.map((item) => (
                                <div key={item.id} className="order_item">
                                    <img src={item.img} alt={item.title} className="order_img" />
                                    <div className="order_details">
                                        <p><strong>Name:</strong> {item.title}</p>
                                        <p><strong>Price:</strong> Rs {item.price}</p>
                                        <p><strong>Quantity:</strong> {item.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order_total">
                            <h3>Total Price: Rs {order.totalPrice}</h3>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
