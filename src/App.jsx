import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { MealsContextProvider } from "./store/meals-context.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <MealsContextProvider>
          <Meals />
        </MealsContextProvider>
      </main>
    </>
  );
}

export default App;
