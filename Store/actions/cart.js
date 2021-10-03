export const Add_To_Cart = 'Add_To_Cart'
export const Remove_From_Cart = 'Remove_From_Cart'

export const add_to_cart = (product) => {
    return {
        type: Add_To_Cart,
        product: product
    }
}

export const REMOVE_From_Cart = (productId) => {
    return {
        type: Remove_From_Cart,
        pid: productId
    }
}