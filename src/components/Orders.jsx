import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import OrderItem from './OrderItem.jsx';

export default function Orders() {
    const { updateModalState, orders } = use(MealsContext);

    return (
        <>
            {orders.length === 0 && (
                <>
                    <h2>No orders available</h2>
                    <p>Add meals to the Cart and proceed to Checkout to create a new Order.</p>
                </>
            )}
            {orders.length !== 0 && <OrderItem order={orders[0]} />}
            <div className="modal-actions">
                <button
                    className='text-button'
                    onClick={() => updateModalState(false, null)}>
                    Cancel
                </button>
            </div>
        </>
    );
}