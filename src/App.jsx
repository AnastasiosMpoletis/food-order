import CartModal from "./components/CartModal.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { MealsContextProvider } from "./store/meals-context.jsx";
import { useState } from "react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <MealsContextProvider>
        {modalIsOpen && <CartModal modalState={modalIsOpen} onClose={() => setModalIsOpen(false)} />}
        <Header onCartClick={() => setModalIsOpen(true)} />
        <main>
          <Meals />
        </main>
      </MealsContextProvider>
    </>
  );
}

export default App;
