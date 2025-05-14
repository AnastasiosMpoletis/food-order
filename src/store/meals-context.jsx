import { createContext, useEffect, useState } from "react";

export const MealsContext = createContext({
    meals: null,
});

export function MealsContextProvider({ children }) {
    const [meals, setMeals] = useState();

    useEffect(() => {
        async function loadMeals() {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();
            // console.log("Context meals: " + meals);
            setMeals(meals);
        }

        loadMeals();
    }, []);


    const contextValue = {
        meals,
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}