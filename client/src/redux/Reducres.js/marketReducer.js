import { SET_MARKETPLACE, SET_PRODUCTS } from "../type"

const initialState ={
    marketPlace : {},
    products: [],
    productCount: 0,
    account:''
}

export default function (state = initialState, action) {
    switch(action.type){
        case SET_MARKETPLACE:
            return{
                ...state,
                marketPlace: action.payload
            }
        case SET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }

    }
}