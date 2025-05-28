import { createContext, useEffect, useState, useReducer } from "react";

export const MealsContext = createContext({
    availableMeals: [],
    orderMeals: [],
    addMealToOrder: () => { },
    updateMealQuantity: () => { },
});

export function MealsContextProvider({ children }) {
    const [availableMeals, setAvailableMeals] = useState();
    const [orderState, orderDispatch] = useReducer(
        orderReducer,
        { orderMeals: [] },
    );

    useEffect(() => {
        async function loadAvailableMeals() {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();
            setAvailableMeals(meals);
        }

        loadAvailableMeals();
    }, []);

    function handleAddMealToOrder(id) {
        orderDispatch({
            type: "ADD_MEAL",
            payload: id
        });

        console.log('Clicked item with id: ' + id);
    }

    function orderReducer(state, action) {
        if (action.type === "ADD_MEAL") {
            const updatedOrderMeals = [...state.orderMeals];

            const existingOrderMealIndex = updatedOrderMeals.findIndex(
                (orderMeal) => orderMeal.id === action.payload
            );
            const existingOrderMeal = updatedOrderMeals[existingOrderMealIndex];

            if (existingOrderMeal) {
                const updatedOrderMeal = {
                    ...existingOrderMeal,
                    quantity: existingOrderMeal.quantity + 1,
                };
                updatedOrderMeals[existingOrderMealIndex] = updatedOrderMeal;
            } else {
                const meal = availableMeals.find((meal) => meal.id === action.payload);
                console.log('Meal: ' + JSON.stringify(meal));
                updatedOrderMeals.push({
                    id: action.payload,
                    name: meal.name,
                    price: meal.price,
                    quantity: 1,
                });
            }

            console.log('UpdatedItems: ' + updatedOrderMeals);

            return {
                ...state,
                orderMeals: updatedOrderMeals,
            };
        }

        // if (action.type === "UPDATE_ITEM") {
        //     const updatedItems = [...state.items];
        //     const updatedItemIndex = updatedItems.findIndex(
        //         (item) => item.id === action.payload.productId
        //     );

        //     const updatedItem = {
        //         ...updatedItems[updatedItemIndex],
        //     };

        //     updatedItem.quantity += action.payload.amount;

        //     if (updatedItem.quantity <= 0) {
        //         updatedItems.splice(updatedItemIndex, 1);
        //     } else {
        //         updatedItems[updatedItemIndex] = updatedItem;
        //     }

        //     return {
        //         ...state,
        //         items: updatedItems,
        //     };
        // }
    }

    function handleUpdateMealQuantity() {
        console.log(orderState);
    }

    const contextValue = {
        availableMeals,
        orderMeals: orderState.orderMeals,
        addMealToOrder: handleAddMealToOrder,
        updateMealQuantity: handleUpdateMealQuantity,
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}