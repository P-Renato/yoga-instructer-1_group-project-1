import "../../App.css";
import Home from "../../views/Home";
import AboutMe from '../../views/AboutMe';
import Schedule from '../../views/Schedule';
import Blog from '../../views/Blog';
import Contact from '../../views/Contact';

export default function Mainpage() {
    return (
        <>
            <Home />
            <AboutMe />
            <Schedule />
            <Blog />
            <Contact />
        </>
    )
}
