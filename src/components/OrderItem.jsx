export default function OrderItem({ order, scrollTableRef }) {
    let totalOrderQuantities = order.items.reduce((sum, item) => sum + item.quantity, 0);
    let totalOrderPrice = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2);

    return (
        <article>
            <table className="customer-data">
                <tbody>
                    <tr>
                        <td>Order Id</td>
                        <td>{order.id}</td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td>{order.customer.name}</td>
                    </tr>
                    <tr>
                        <td>E-Mail Address</td>
                        <td>{order.customer.email}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>{order.customer.street}</td>
                    </tr>
                    <tr>
                        <td>Postal Code</td>
                        <td>{order.customer["postal-code"]}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{order.customer.city}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <div className="customer-items-container" ref={scrollTableRef}>
                <table className="customer-items">
                    <thead className="customer-items-header">
                        <tr>
                            <th>Meal</th>
                            <th>Quantity</th>
                            <th>Item Price</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map(item => {
                            const totalItemPrice = (item.price * item.quantity).toFixed(2);

                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{`$${item.price}`}</td>
                                    <td>{`$${totalItemPrice}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <table className="customer-items customer-items-total">
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>{totalOrderQuantities}</th>
                        <th></th>
                        <th>{`$${totalOrderPrice}`}</th>
                    </tr>
                </thead>
            </table>
        </article>
    );
}