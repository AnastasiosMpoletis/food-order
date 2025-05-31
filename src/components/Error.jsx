import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function Error() {
    const { updateModalState } = use(MealsContext);

    return (
        <div className="error">
            <h2>Oooops...</h2>
            <p>Something went wrong and we couldn&apos;t process your order. <br />Try ordering again later.</p>
            <div className='modal-actions'>
                <button
                    className='button'
                    onClick={() => {
                        updateModalState(false, null);
                    }}>
                    OK
                </button>
            </div>
        </div>
    );
}