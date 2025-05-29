import Modal from "./components/Modal.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { MealsContextProvider } from "./store/meals-context.jsx";

function App() {
  return (
    <MealsContextProvider>
      <Modal />
      <Header />
      <main>
        <Meals />
      </main>
    </MealsContextProvider>
  );
}

export default App;
