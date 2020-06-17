import { SET_MARKETPLACE, SET_PRODUCTS } from "../type";


export function setMarketPlace (marketPlace) {
    return{
        type: SET_MARKETPLACE,
        payload: marketPlace,
    }   
}

export function setProducts(products){
    return{
        type:SET_PRODUCTS,
        payload: products
    }
}


