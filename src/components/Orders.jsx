import { use, useState } from 'react';
import { MealsContext } from '../store/meals-context.jsx';
import OrderItem from './OrderItem.jsx';

export default function Orders() {
    const { updateModalState, orders, deleteOrder } = use(MealsContext);
    const totalOrders = orders.length;
    const [currentOrder, setCurrentOrder] = useState({
        page: 1,
        maxPage: totalOrders,
        current: 0,
    });

    const ordersAreEmpty = totalOrders === 0;

    function handleGoToPreviousOrder(onDelete) {
        setCurrentOrder(currentOrder => {
            if (currentOrder.page !== 1) {
                if (!onDelete) {
                    return {
                        page: currentOrder.page - 1,
                        maxPage: currentOrder.maxPage,
                        current: currentOrder.current - 1,
                    };
                } else {
                    return {
                        page: currentOrder.page,
                        maxPage: currentOrder.maxPage - 1,
                        current: currentOrder.current,
                    };
                }
            } else {
                if (!onDelete) {
                    return {
                        page: 1,
                        maxPage: currentOrder.maxPage,
                        current: 0,
                    };
                } else {
                    return {
                        page: 0,
                        maxPage: 0,
                        current: 0,
                    };
                }
            }
        });
    }

    function handleGoToNextOrder() {
        if (currentOrder.current + 1 === totalOrders) {
            return;
        } else {
            setCurrentOrder(currentOrder => {
                const newOrder = {
                    page: currentOrder.page + 1,
                    maxPage: totalOrders,
                    current: currentOrder.current + 1,
                }
                return newOrder;
            });
        }
    }

    async function onDeleteOrder() {
        await deleteOrder(orders[currentOrder.current].id);
        updateModalState(true, "ORDERS");
        handleGoToPreviousOrder(true);
    }

    function createNavigationPages() {
        if (ordersAreEmpty) {
            return ` 0/0 `;
        } else {
            return ` ${currentOrder.page}/${currentOrder.maxPage} `;
        }
    }

    return (
        <>
            <h2>Your Orders</h2>

            {ordersAreEmpty && (
                <p>No orders available.<br />Add meals to the Cart and proceed to Checkout to create a new Order.</p>
            )}
            {!ordersAreEmpty && orders[currentOrder.current] &&
                <OrderItem order={orders[currentOrder.current]} />
            }

            <div className="orders-actions">
                <button
                    className="text-clear-button"
                    onClick={() => updateModalState(true, "DELETE", null, () => onDeleteOrder())}
                    disabled={ordersAreEmpty}
                >Delete Order</button>
                <div className="navigation">
                    <button
                        onClick={() => handleGoToPreviousOrder()}
                        disabled={ordersAreEmpty}
                    >{"<"}</button>
                    <span>{createNavigationPages()}</span>
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