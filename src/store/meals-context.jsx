import { createContext, useEffect, useState, useReducer } from "react";

export const MealsContext = createContext({
    availableMeals: [],
    orderMeals: [],
    addMealToOrder: () => { },
    updateMealQuantity: () => { },
});

const SAVED_ORDER = "savedOrder";

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
        handleAddOrder(loadOrderFromMemory());

    }, []);

    function handleAddOrder(order) {
        orderDispatch({
            type: "ADD_ORDER",
            payload: order
        });
    }

    function handleAddMealToOrder(id) {
        orderDispatch({
            type: "ADD_MEAL",
            payload: id
        });
    }

    function handleUpdateMealQuantity(id, amount) {
        orderDispatch({
            type: "UPDATE_MEAL",
            payload: {
                id,
                amount,
            }
        });
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
                updatedOrderMeals.push({
                    id: action.payload,
                    name: meal.name,
                    price: meal.price,
                    quantity: 1,
                });
            }

            saveOrderToMemory(updatedOrderMeals);

            return {
                ...state,
                orderMeals: updatedOrderMeals,
            };
        }

        if (action.type === "UPDATE_MEAL") {
            const updatedOrderMeals = [...state.orderMeals];

            const existingOrderMealIndex = updatedOrderMeals.findIndex(
                (orderMeal) => orderMeal.id === action.payload.id
            );

            const updatedOrderMeal = {
                ...updatedOrderMeals[existingOrderMealIndex],
            };

            updatedOrderMeal.quantity += action.payload.amount;

            if (updatedOrderMeal.quantity <= 0) {
                updatedOrderMeals.splice(existingOrderMealIndex, 1);
            } else {
                updatedOrderMeals[existingOrderMealIndex] = updatedOrderMeal;
            }

            saveOrderToMemory(updatedOrderMeals);

            return {
                ...state,
                orderMeals: updatedOrderMeals,
            };
        }

        if (action.type === "ADD_ORDER") {
            return {
                orderMeals: action.payload
            };
        }
    }

    /**
     * Saves order in progress in browser memory.
     * 
     * @param {*} order 
     */
    function saveOrderToMemory(order) {
        localStorage.setItem(SAVED_ORDER, JSON.stringify(order));
    }

    /**
     * @returns order saved in browser memory
     */
    function loadOrderFromMemory() {
        return JSON.parse(localStorage.getItem(SAVED_ORDER)) || [];
    }

    const contextValue = {
        availableMeals,
        orderMeals: orderState.orderMeals,
        addMealToOrder: handleAddMealToOrder,
        updateMealQuantity: handleUpdateMealQuantity,
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}