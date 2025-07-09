import "../App.css";
import "./styles/Home.css";

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
        </>
    )
}