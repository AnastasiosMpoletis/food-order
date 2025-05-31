import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function Error() {
    const { updateModalState, modalState } = use(MealsContext);

    let errorHeader;
    let errorMessage;

    if (modalState?.message) {
        errorHeader = modalState.message;
        errorMessage = <p>Please add some meals in your order.</p>;
    } else {
        errorHeader = "Oooops...";
        errorMessage = <p>Something went wrong and we couldn&apos;t process your order. <br />Try ordering again later.</p>
    }

    return (
        <div className="error">
            <h2>{errorHeader}</h2>
            {errorMessage}
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