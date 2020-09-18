import { GET_PRODUCTS_SUCCESS, SHOW_PRODUCT_POPUP, HIDE_PRODUCT_POPUP } from "../../Types";

export default (state, action) => {
    switch(action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                banner_product: action.payload.product_on_banner !== null ? action.payload.product_on_banner : {},
                products: action.payload.products
            }

        case SHOW_PRODUCT_POPUP:
            return {
                ...state,
                showProductPopup: true
            }

        case HIDE_PRODUCT_POPUP:
            return {
                ...state,
                showProductPopup: false
            }

        default:
            return state;
    }
}