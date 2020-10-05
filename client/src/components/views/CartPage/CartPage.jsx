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
import Axios from 'axios';
function CartPage(props) {
    const dispatch = useDispatch();
    const [TotalPrice, setTotalPrice] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);

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
        setShowTotal(true);
    }


    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(() => {
                // if (props.user.cartDetail.length <= 0) {
                //     setShowTotal(false);
                // } else {
                //     calculateTotal(props.user.cartDetail);
                // }
                /**
                 * Hacky way to update total, since above code doesn't work...
                 * Redux is probably to slow and can't calculate it in time...
                 */
                Axios.get('/api/users/userCartInfo')
                    .then(response => {
                        if (response.data.success) {
                            if (response.data.cartDetail.length <= 0) {
                                setShowTotal(false)
                            } else {
                                calculateTotal(response.data.cartDetail)
                            }
                        } else {
                            alert("Failt to get cart data");
                        }
                    })
            })
    }

    return (
        <div className="CartPage__container">
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />

                {
                    ShowTotal ?
                        <div className="CartPage__finish">
                            <h2>Total ammount: {TotalPrice}€</h2>
                        </div>
                        :
                        ShowSuccess ?
                            <Result
                                status="success"
                                title="Successfully Purchased Items"
                            />
                            :
                            <div className="CartPage__products">
                                <Empty description={false} />
                                <p>No items in the Cart!</p>
                            </div>
                }
            </div>
        </div>
    )
}

export default CartPage