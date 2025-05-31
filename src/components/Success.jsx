import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function Success() {
    const { updateModalState, modalState, clearOrder } = use(MealsContext);

    return (
        <>
            <p>{modalState?.message}</p>
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