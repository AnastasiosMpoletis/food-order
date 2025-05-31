import { use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import logo from '../assets/logo.jpg';

export default function Header() {
    const { totalMealsQuantity, updateModalState, totalOrders } = use(MealsContext);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Scyscrapers across a plate." />
                <h1>ReactFood</h1>
            </div>
            <button
                className='text-button'
                onClick={() => updateModalState(true, "ORDERS")}>
                {`Orders (${totalOrders})`}
            </button>
            <button
                className='text-button'
                onClick={() => updateModalState(true, "CART")}>
                {`Cart (${totalMealsQuantity})`}
            </button>
        </header>
    );
}