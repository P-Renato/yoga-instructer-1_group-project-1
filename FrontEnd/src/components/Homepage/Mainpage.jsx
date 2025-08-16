import "../../App.css";
import Home from "../../views/Home";
import AboutMe from '../../views/AboutMe';
import Schedule from '../../views/Schedule';
import Blog from '../../views/Blog';
import Contact from '../../views/Contact';
import Event from "../../views/Event"
import Footer from "./Footer";

export default function Mainpage() {
    return (
        <div className="mainpage">
            <main>
                <Home />
                <AboutMe />
                <Schedule />
                <Blog />
                <Event />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
