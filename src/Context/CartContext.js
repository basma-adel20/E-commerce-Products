import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    

    const [CountItem, setCountItem] = useState(0);
    

    let headers={
        token: localStorage.getItem('userToken')
    }

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId
        },{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function checkOutSession(cartId,shippingaddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingaddress
        },{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }



    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            })
            .then((response) => response)
            .catch((err) => {
                throw err; // throw the error to be caught by the caller
            });
    }
    

    function deleteCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }


    function updateCartItems(productId ,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        } ,{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }


    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    

    return <CartContext.Provider value={{addToCart , getCartItems , deleteCartItem ,updateCartItems , clearCart , CountItem, setCountItem , checkOutSession}}>
        {props.children}
    </CartContext.Provider>
}