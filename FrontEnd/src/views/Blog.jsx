import "../App.css";
import "./Blog.css";

export default function Blog () {
    return (
        <>
            <header className="blogHeader" id="blog">
                <p>
                  Yoga life&nbsp;&nbsp;&nbsp;    /   &nbsp;&nbsp;&nbsp;Meditation&nbsp;&nbsp;&nbsp;    /&nbsp;&nbsp;&nbsp;    Psychology&nbsp;&nbsp;&nbsp;     /       &nbsp;&nbsp;&nbsp;Movie
                </p>
                <h2>Blog</h2>
            </header>
            <section className="blogSection">
                <nav className="container1 container">
                    <nav className="img-box">
                        <img src="yogaphoto/5ab014e1-82ef-43e8-a6df-a9d1e56da53b.png" alt="Blog-image" />
                    </nav>
                    
                    <nav className="innerTexts1">
                        <span className="inline-flex"><p>30.01.2025</p><strong>New!</strong></span>
                        <h3>Create a good relationship with your chakras</h3>
                        <p>Create a harmonious relationship with your chakras to cultivate balance, self-awareness, and inner peace....</p>
                        <a href="">Read more...</a>
                    </nav>
                </nav>
                <section className="secondLayout">
                    <nav className="container2 container">
                    <nav>
                         <img src="yogaphoto/23ebdcb8-22a5-4fa8-9390-dfa0917fcb68 2.png" alt="Blog-image" />
                    </nav>
                   
                    <nav className="innerTexts">
                        <p>17.01.2025</p>
                        <h3>Participated in a meditation seminar</h3>
                        <a href="">Read more...</a>
                    </nav>
                </nav>
                <nav className="container4 container">
                    <nav>
                         <img src="yogaphoto/11f1731b-2c94-43ad-9a5a-f5d217a7ece8.png" alt="Blog-image" />
                    </nav>
                   
                    <nav className="innerTexts">
                        <p>17.01.2025</p>
                        <h3>Living with nature</h3>
                        <a href="">Read more...</a>
                    </nav>
                </nav>
                </section>
                
                <section className="thirdLayout">
                    <nav className="container3 container">
                    <nav>
                        <img src="yogaphoto/e8bb2985-c52e-4375-996f-d155e0422493.png" alt="Blog-image" />
                    </nav>
                    
                    <nav className="innerTexts">
                         <p>17.01.2025</p>
                        <h3>Adjusting your body to the length of the Day</h3>
                        <a href="">Read more...</a>
                    </nav>
                </nav>
                <nav className="container5 container">
                    <nav>
                        <img src="yogaphoto/d8ad3e34-d319-4bed-a0a1-1bff896a14e0.png" alt="Blog-image" />
                    </nav>
                    
                    <nav className="innerTexts">
                        <p>17.01.2025</p>
                        <h3>Participated in a meditation seminar</h3>
                        <a href="">Read more...</a>
                    </nav>
                </nav>
                </section>
                
                
                
            </section>
        </>
    )
}