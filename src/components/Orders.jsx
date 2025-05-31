import { use } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import OrderItem from './OrderItem.jsx';

export default function Orders() {
    const { updateModalState, orders } = use(MealsContext);

    return (
        <>
            {/* //TODO ANBOL when there are no orders, display something */}
            {orders.length !== 0 && <OrderItem order={orders[1]} />}
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