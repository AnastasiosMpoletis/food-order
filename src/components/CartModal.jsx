import { createPortal } from "react-dom";
import { useRef, useEffect, use } from "react";
import { MealsContext } from '../store/meals-context.jsx';

export default function CartModal({ modalState, onClose }) {
    const { orderMeals, updateMealQuantity } = use(MealsContext);
    const dialog = useRef();

    useEffect(() => {
        if (modalState) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [modalState]);

    const totalPrice = orderMeals.reduce(
        (acc, meal) => acc + parseInt(meal.price) * meal.quantity,
        0
    );
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return createPortal(
        <dialog className='modal cart' ref={dialog}>
            <h2>Your Cart</h2>
            {orderMeals.length === 0 && <p>No Meals ordered</p>}
            {orderMeals.length > 0 && (
                <ul>
                    {orderMeals.map(orderMeal => {
                        const formattedPrice = `$${parseInt(orderMeal.price).toFixed(2)}`;

                        return (
                            <li key={orderMeal.id} >
                                <div className='cart-item'>
                                    <div>
                                        <span>{orderMeal.name}</span>
                                        <span> {orderMeal.quantity} x</span>
                                        <span> {formattedPrice}</span>
                                    </div>
                                    <div className="cart-item-actions">
                                        <button onClick={() => updateMealQuantity(orderMeal.id, -1)}>
                                            -
                                        </button>
                                        <span>{orderMeal.quantity}</span>
                                        <button onClick={() => updateMealQuantity(orderMeal.id, 1)}>
                                            +
                                        </button>
                                    </div>

                                </div>
                            </li>)
                    })}
                </ul>
            )}
            <p className="cart-total">
                <strong>{formattedTotalPrice}</strong>
            </p>
            <div className='modal-actions'>
                <button className='text-button' onClick={onClose}>Cancel</button>
                <button className='button' onClick={updateMealQuantity}>Go to Checkout</button>
            </div>
        </dialog>, document.getElementById('modal')
    );
}