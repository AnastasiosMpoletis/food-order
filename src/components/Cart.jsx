import { use } from "react";
import { MealsContext } from '../store/meals-context.jsx';

export default function Cart() {
    const { orderMeals, updateMealQuantity } = use(MealsContext);

    const totalPrice = orderMeals.reduce(
        (acc, meal) => acc + parseInt(meal.price) * meal.quantity,
        0
    );
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div className='cart'>
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
    );
}