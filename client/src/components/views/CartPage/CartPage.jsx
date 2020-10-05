import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem
} from '../../../_actions/user_actions';
import { Result, Empty } from 'antd';

import './CartPage.css';
import UserCardBlock from './Sections/UserCardBlock';
function CartPage(props) {
    const dispatch = useDispatch();
    const [TotalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart));
            }
        }
    }, [props.user.userData]);

    useEffect(() => {
        if (props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculateTotal(props.user.cartDetail);
        }
    }, [props.user.cartDetail])

    const calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price) * item.quantity;
        })
        setTotalPrice(total);
    }


    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(
                console.log(productId)
            )
    }

    return (
        <div className="CartPage__container">
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />

                <div className="CartPage__finish">
                    <h2>Total ammount: {TotalPrice}€</h2>
                </div>
                <Result
                    status="success"
                    title="Successfully Purchased Items"
                />
                <div className="CartPage__products">
                    <Empty description={false} />
                    <p>No items in the Cart!</p>
                </div>
            </div>
        </div>
    )
}

export default CartPage