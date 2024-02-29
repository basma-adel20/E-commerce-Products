import React, { createContext} from 'react'
import axios from "axios";

export let WishListContext = createContext()

export default function WishListProvider(props) {

    let headers={
        token: localStorage.getItem('userToken')
    }

    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId:productId
        },{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function getWishItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function deleteWishItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }


  return <WishListContext.Provider value={{addToWishList , deleteWishItem , getWishItems}}>

    {props.children}
  </WishListContext.Provider>
}
