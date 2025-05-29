import CartModal from "./components/CartModal.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { MealsContextProvider } from "./store/meals-context.jsx";

function App() {
  return (
    <MealsContextProvider>
      <CartModal />
      <Header />
      <main>
        <Meals />
      </main>
    </MealsContextProvider>
  );
}

export default App;
