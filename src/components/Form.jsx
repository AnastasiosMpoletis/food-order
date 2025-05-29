import { use, useActionState } from 'react';
import { MealsContext } from '../store/meals-context.jsx';

export default function Form() {
    const { formattedTotalPrice, updateModalState } = use(MealsContext);

    return (
        <>
            <h2>Checkout</h2>
            <p>{`Total amount: ${formattedTotalPrice}`}</p>
            <form action={() => { }}>
                <p className="control">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                    // defaultValue={formState.enteredValues?.userName}
                    />
                </p>
                <p className="control">
                    <label htmlFor="email">E-Mail Address</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                    // defaultValue={formState.enteredValues?.userName}
                    />
                </p>
                <p className="control">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                    // defaultValue={formState.enteredValues?.userName}
                    />
                </p>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input
                            type="text"
                            id="postal-code"
                            name="postal-code"
                        // defaultValue={formState.enteredValues?.userName}
                        />
                    </p>
                    <p className="control">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                        // defaultValue={formState.enteredValues?.userName}
                        />
                    </p>
                </div>
            </form>

            <div className='modal-actions'>
                <button
                    className='text-button'
                    onClick={() => updateModalState(true, "CART")}>
                    Cancel
                </button>
                <button
                    className='button'>
                    Sumbit Order
                </button>
            </div>
        </>
    );
}