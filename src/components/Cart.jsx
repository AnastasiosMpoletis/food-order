import { use } from "react";
import { MealsContext } from '../store/meals-context.jsx';

export default function Cart() {
    const { orderMeals, formattedTotalPrice, updateMealQuantity, updateModalState } = use(MealsContext);

    return (
        <>
            <div className='cart'>
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
            </div>

            <div className='modal-actions'>
                <button
                    className='text-clear-button'
                    onClick={() => updateModalState(true, "CLEAR")}
                    disabled={orderMeals.length < 1}>
                    Clear
                </button>
                <button
                    className='text-button'
                    onClick={() => updateModalState(false, null)}>
                    Cancel
                </button>
                <button
                    className='button'
                    onClick={() => updateModalState(true, "FORM")}
                    disabled={orderMeals.length < 1}>
                    Go to Checkout
                </button>
            </div >
        </>
    );
}