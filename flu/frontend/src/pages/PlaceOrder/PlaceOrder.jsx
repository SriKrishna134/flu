import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalcartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState('card'); // New state for payment method
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcartAmount() + 2,
      paymentMethod: paymentMethod // Add payment method to the order data
    };

    // If payment method is card, go for card payment
    if (paymentMethod === 'card') {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });
      console.log(response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Order failed");
      }
    } else {
      // Handle cash on delivery order
      let response = await axios.post(url + "/api/order/place-cod", orderData, {
        headers: { token }
      });
      if (response.data.success) {
        alert("Order placed successfully. Pay on delivery.");
        navigate('/myorders'); // Redirect to order summary or confirmation page
      } else {
        alert("Order failed");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalcartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Type your email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Address' />
        <div className="multi-field">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Pin code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal:</p>
              <p>₹{getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee:</p>
              <p>₹{getTotalcartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 2}</b>
            </div>
          </div>
          <div className="payment-method">
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Pay with Card
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
          </div>
          <button type='submit'>Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
