import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import MealItem from './MealItem.jsx';

export default function Meals() {
    const { availableMeals } = use(MealsContext);

    return (
        <div>
            {availableMeals && (
                <ul id="meals">
                    {availableMeals.map((meal) =>
                        <li key={meal.id} className='meal-item'>
                            <MealItem meal={meal} />
                        </li>
                    )}
                </ul>
            )}
            {!availableMeals && <p>No meals</p>}
        </div>
    );
}