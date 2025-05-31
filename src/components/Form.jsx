import { use, useActionState } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import Submit from './Submit.jsx';

export default function Form() {
    const { formattedTotalPrice, updateModalState, submitOrder, reloadOrders } = use(MealsContext);

    async function placeOrderAction(previousState, formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const street = formData.get('street');
        const postalCode = formData.get("postal-code");
        const city = formData.get("city");

        /**
         * It would be better to  have some validations here.
         * We do not do that in this project, in order to use the server side validations.
         */

        // if (name.trim().length === 0) {
        //     errors.push("Please provide your name.");
        // }

        // if (!email.trim().includes("@")) {
        //     errors.push("Please provide a valid email.");
        // }

        // if (street.trim().length === 0) {
        //     errors.push("Please provide your street.");
        // }

        // if (postalCode.trim().length !== 5) {
        //     errors.push("Please provide your 5-digit postal code.");
        // }

        // if (city.trim().length === 0) {
        //     errors.push("Please provide your city.");
        // }

        // if (error != null) {
        //     return {
        //         error,
        //         enteredValues: {
        //             name,
        //             email,
        //             street,
        //             postalCode,
        //             city,
        //         }
        //     };
        // }

        const response = await submitOrder({ name, email, street, postalCode, city });

        if (!response.ok) {
            switch (response.status) {
                case 404: {
                    updateModalState(true, "ERROR");
                    break;
                }
                case 400: {
                    const responseResult = await response.json();
                    const errorMessage = responseResult.message;
                    updateModalState(true, "ERROR", errorMessage);
                    return {
                        error: errorMessage,
                        enteredValues: {
                            name,
                            email,
                            street,
                            postalCode,
                            city,
                        }
                    };
                }
                case 401: {
                    const responseResult = await response.json();
                    return {
                        error: responseResult.message,
                        enteredValues: {
                            name,
                            email,
                            street,
                            postalCode,
                            city,
                        }
                    };
                }
            }
        } else {
            const responseResult = await response.json();
            updateModalState(true, "SUCCESS", responseResult.message);
            reloadOrders();
        }

        return {
            errors: null,
            enteredValues: {
                name,
                email,
                street,
                postalCode,
                city,
            }
        };
    }

    const [formState, formAction, pending] = useActionState(placeOrderAction, { errors: null });

    return (
        <>
            <h2>Checkout</h2>
            <p>{`Total amount: ${formattedTotalPrice}`}</p>
            <form action={formAction}>
                <p className="control">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue="Tasos"
                        // defaultValue={formState.enteredValues?.name}
                    />
                </p>
                <p className="control">
                    <label htmlFor="email">E-Mail Address</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue="tasos@boletis.gr"
                        // defaultValue={formState.enteredValues?.email}
                    />
                </p>
                <p className="control">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        defaultValue="25h Martiou"
                        // defaultValue={formState.enteredValues?.street}
                    />
                </p>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input
                            type="text"
                            id="postal-code"
                            name="postal-code"
                            defaultValue="45000"
                            // defaultValue={formState.enteredValues?.postalCode}
                        />
                    </p>
                    <p className="control">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            defaultValue="Ioannina"
                            // defaultValue={formState.enteredValues?.city}
                        />
                    </p>
                </div>

                {formState.error && <div className="error">{formState.error}</div>}

                <div className='modal-actions'>
                    <button
                        className='text-button'
                        onClick={() => updateModalState(true, "CART")}>
                        Cancel
                    </button>
                    <Submit />
                </div>
            </form >
        </>
    );
}