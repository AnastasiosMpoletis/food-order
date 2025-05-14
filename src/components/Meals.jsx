import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import MealItem from './MealItem.jsx';

export default function Meals() {
    const { meals } = use(MealsContext);

    return (
        <div >
            {meals && (
                <ul id="meals">
                    {meals.map((meal) =>
                        <li key={meal.id} className="meal-item">
                            <MealItem meal={meal} />
                        </li>
                    )}
                </ul>
            )}
            {!meals && <p>No meals</p>}
        </div>
    );
}