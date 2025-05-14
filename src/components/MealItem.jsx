export default function MealItem({ meal: { id, name, price, description, image } }) {
    return (
        <article>
            {/* <img src={image} alt="Meal image"/> */}
            <h3>{name}</h3>
            <div className="meal-item-price">{price}</div>
            <div className="meal-item-description">{description}</div>
            <button>Order</button>
        </article>
    );
}