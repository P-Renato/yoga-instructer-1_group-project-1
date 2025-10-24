import "../App.css";
import "./styles/Home.css";
 import { Link } from "react-router-dom";
import Header from '../components/Homepage/Header'

export function smoothScroll (e, targetId)  {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

export default function Home() {

    return (
        <>
            <Header />
            <nav className="headerText">
                <p>
                    "The nature of yoga is to shine the light of awareness into the darkest corners of the body." <br /> — Jason Crandell

                </p>
            </nav>
           


            <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
            }}>
            <Link 
                to="/admin" 
                style={{
                background: '#007bff',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontSize: '14px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
            >
                Login
            </Link>
</div>
        </>
    )
}