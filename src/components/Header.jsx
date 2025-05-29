import { use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import logo from '../assets/logo.jpg';

export default function Header() {
    const { orderMeals, updateModalState } = use(MealsContext);

    const totalQuantity = orderMeals.reduce((acc, meal) => acc + meal.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Scyscrapers across a plate." />
                <h1>ReactFood</h1>
            </div>
            <button
                className='text-button'
                onClick={() => updateModalState(true, "CART")}
            >{`Cart (${totalQuantity})`}
            </button>
        </header>
    );
}