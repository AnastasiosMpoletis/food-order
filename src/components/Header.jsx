import logo from '../assets/logo.jpg';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Scyscrapers across a plate." />
                <h1>ReactFood</h1>
            </div>
            <button>Cart</button>
        </header>
    );
}