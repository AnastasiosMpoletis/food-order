export default function OrderItem({ order }) {
    let totalOrderQuantities = order.items.reduce((sum, item) => sum + item.quantity, 0);
    let totalOrderPrice = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2);

    return (
        <article>
            <table className="customer-data">
                <tbody>
                    <tr>
                        <td>Order Id</td>
                        <td className="table-value">{order.id}</td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td className="table-value">{order.customer.name}</td>
                    </tr>
                    <tr>
                        <td>E-Mail Address</td>
                        <td className="table-value">{order.customer.email}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td className="table-value">{order.customer.street}</td>
                    </tr>
                    <tr>
                        <td>Postal Code</td>
                        <td className="table-value">{order.customer["postal-code"]}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td className="table-value">{order.customer.city}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <table className="customer-items">
                <thead>
                    <tr>
                        <th className="table-header-item">Meal</th>
                        <th className="table-header-item">Quantity</th>
                        <th className="table-header-item">Item Price</th>
                        <th className="table-header-item">Price</th>
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
                    <tr className="customer-items-total">
                        <td>Total</td>
                        <td>{totalOrderQuantities}</td>
                        <td></td>
                        <td>{`$${totalOrderPrice}`}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}