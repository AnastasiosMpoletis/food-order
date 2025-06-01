import { use, useState } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import OrderItem from './OrderItem.jsx';

export default function Orders() {
    const { updateModalState, orders, deleteOrder } = use(MealsContext);
    const [currentOrder, setCurrentOrder] = useState(0);

    const totalOrders = orders.length;
    const ordersAreEmpty = totalOrders === 0;

    function handleGoToPreviousOrder() {
        setCurrentOrder(currentOrder => currentOrder === 0 ? currentOrder : currentOrder - 1);
    }

    function handleGoToNextOrder() {
        setCurrentOrder(currentOrder => currentOrder === orders.length - 1 ? currentOrder : currentOrder + 1);
    }

    function onDeleteOrder() {
        deleteOrder(orders[currentOrder].id);
        updateModalState(true, "ORDERS");
        handleGoToPreviousOrder();
    }

    /**
     * 
     * @returns TODO ANBOL fix pagination bug
     */
    function getPagination() {
        return (<span>{` ${currentOrder}/${totalOrders} `}</span>);
    }

    return (
        <>
            <h2>Your Orders</h2>
            {ordersAreEmpty && (
                <p>No orders available.<br />Add meals to the Cart and proceed to Checkout to create a new Order.</p>
            )}
            {!ordersAreEmpty && orders[currentOrder] && <OrderItem order={orders[currentOrder]} />}

            <div className="orders-actions">
                <button
                    className="text-clear-button"
                    onClick={() => updateModalState(true, "DELETE", null, () => onDeleteOrder())}
                    disabled={ordersAreEmpty}
                >Delete Order</button>
                <div className="navigation">
                    <button
                        onClick={handleGoToPreviousOrder}
                        disabled={ordersAreEmpty}
                    >{"<"}</button>
                    {/* <span>{` ${currentOrder + 1}/${totalOrders} `}</span> */}
                    {getPagination()}
                    <button
                        onClick={handleGoToNextOrder}
                        disabled={ordersAreEmpty}
                    >{">"}</button>
                </div>
                <div className="modal-actions">
                    <button
                        className='text-button'
                        onClick={() => updateModalState(false, null)}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}