import React from 'react'
import {smoothScroll} from '../../views/Home'
export default function Header() {
    return (
        <header className="header">
            <nav className="navBar">
                <a href="#aboutMe" onClick={(e) => smoothScroll(e, '#aboutMe')}>About me</a>
                <a href="#schedule" onClick={(e) => smoothScroll(e, '#schedule')}>Schedule</a>
                <a href="#event" onClick={(e) => smoothScroll(e, "#event")}>Event</a>
                <a href="#blog" onClick={(e) => smoothScroll(e, '#blog')}>Blog</a>
            </nav>
            <h1>Carolina Rose</h1>
            <a href="#contact" onClick={(e) => smoothScroll(e, "#contact")}><button>Contact</button></a>
        </header>
    )
}
