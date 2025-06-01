import { use } from "react";
import { MealsContext } from '../store/meals-context.jsx';

export default function Cart() {
    const { orderMeals, formattedTotalPrice, updateMealQuantity, updateModalState, clearOrder } = use(MealsContext);

    function onClearOrder() {
        clearOrder();
        updateModalState(false, null);
    }

    return (
        <>
            <div className='cart'>
                <h2>Your Cart</h2>
                {orderMeals.length === 0 && <p>No Meals in Cart</p>}
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
            </div>

            <div className="orders-actions">
                <button
                    className='text-clear-button'
                    onClick={() => updateModalState(true, "CLEAR", null, () => onClearOrder())}
                    disabled={orderMeals.length < 1}
                >Clear Order
                </button>
                <div className='modal-actions'>
                    <button
                        className='text-button'
                        onClick={() => updateModalState(false, null)}
                    >Cancel
                    </button>
                    <button
                        className='button'
                        onClick={() => updateModalState(true, "FORM")}
                    /**
                     * It would be better to disable the 'Go to Checkout' button if no meals are selected.
                     * We do not do that in this project, in order to display the response error.
                     */
                    // disabled={orderMeals.length < 1}
                    >Go to Checkout
                    </button>
                </div >
            </div>

        </>
    );
}