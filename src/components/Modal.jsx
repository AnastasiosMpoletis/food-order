import { createPortal } from "react-dom";
import { useRef, useEffect, use } from "react";
import { MealsContext } from '../store/meals-context.jsx';
import ClearOrder from "./ClearOrder.jsx";
import Cart from "./Cart.jsx";
import Form from "./Form.jsx";
import Success from "./Success.jsx";
import Error from "./Error.jsx";
import Orders from "./Orders.jsx";

export default function Modal() {
    const { modalState } = use(MealsContext);
    const dialog = useRef();

    useEffect(() => {
        if (modalState.isOpen) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [modalState]);

    return createPortal(
        <dialog className='modal' ref={dialog}>
            {modalState.state === "CLEAR" && <ClearOrder />}
            {modalState.state === "CART" && <Cart />}
            {modalState.state === "FORM" && <Form />}
            {modalState.state === "SUCCESS" && <Success />}
            {modalState.state === "ERROR" && <Error />}
            {modalState.state === "ORDERS" && <Orders />}
        </dialog>, document.getElementById('modal')
    );
}