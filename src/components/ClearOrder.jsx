import { MealsContext } from '../store/meals-context.jsx';
import { use } from "react";

export default function ClearOrder() {
    const { clearOrder, updateModalState } = use(MealsContext);

    return (
        <>
            <p>Are you sure you want to delete your order?</p>
            <div className='modal-actions'>
                <button
                    className='button'
                    onClick={() => updateModalState(true, "CART")}>
                    No
                </button>
                <button
                    className='text-button'
                    onClick={clearOrder}>
                    Yes
                </button>
            </div>
        </>
    );
}