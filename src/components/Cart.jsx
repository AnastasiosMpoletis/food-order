import { use } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = use(CartContext);
    const userProgressCtx = use(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item =>
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                        onIncrease={() => cartCtx.addItem(item)}
                    />
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button>Go to Checkout</Button>
            </p>
        </Modal>
    );
}