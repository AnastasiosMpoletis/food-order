import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function MealItem({ meal: { id, name, price, description, image } }) {
    const { addMealToOrder } = use(MealsContext);

    return (
        <article>
            <header>
                <img src={`http://localhost:3000/${image}`} alt={name} />
                <h3>{name}</h3>
                <div className="meal-item-price">{`$${price}`}</div>
                <div className="meal-item-description">{description}</div>
            </header>
            <div >
                <button className="meal-item-actions button" onClick={() => addMealToOrder(id)}>Add to cart</button>
            </div>
        </article>
    );
}