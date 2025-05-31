import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function Success() {
    const { updateModalState, clearOrder } = use(MealsContext);

    return (
        <>
            <p>Order successfully submited!</p>
            <div className='modal-actions'>
                <button
                    className='button'
                    onClick={() => {
                        updateModalState(false, null);
                        clearOrder();
                    }}>
                    OK
                </button>
            </div>
        </>
    );
}