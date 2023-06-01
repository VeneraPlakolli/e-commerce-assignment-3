import { shopifyBuy } from "./helpers";

const getExistingCheckoutId = () => localStorage.getItem("checkoutId");

export const getCheckoutId = async () => {
    const checkoutId = getExistingCheckoutId();
    if (checkoutId && await shopifyBuy.checkout.fetch(checkoutId)) {
        return checkoutId;
    }

    const newCheckout = await shopifyBuy.checkout.create();
    localStorage.setItem("checkoutId", newCheckout.id);

    return newCheckout.id;
};

// Add to Cart
export const addCartItem = async (variantId, quantity) => {
    
    const lineItem = [
        {
            variantId: variantId,
            quantity: quantity,
        }
    ];

    const updatedCheckout = await shopifyBuy.checkout.addLineItems(await getCheckoutId(), lineItem);
    return updatedCheckout;
};

// Update Cart Item
export const updateCartItem = async (itemId, qty) => {
    const lineItem = [{
        id: itemId,
        quantity: qty
    }];

    const updatedCheckout = await shopifyBuy.checkout.updateLineItems(await getCheckoutId(), lineItem);
    return updatedCheckout;
};

// Remove Cart Item
export const removeCartItems = async (lineItemIds) => {
    const updatedCheckout = await shopifyBuy.checkout.removeLineItems(await getCheckoutId(), lineItemIds);
    return updatedCheckout;
};
