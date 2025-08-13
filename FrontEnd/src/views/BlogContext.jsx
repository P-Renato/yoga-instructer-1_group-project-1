import { createContext,  useState, useEffect} from "react";

export const blogContext = createContext(null)

export function ContextProvider({children}){
    const [blogs, setBlogs] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/blogs/all')
            .then((res) => res.json())
            .then((data) => setBlogs(data.slice(0, 5)));
            console.log(blogs)

        fetch('http://localhost:5001/api/events/all')
            .then((res) => res.json())
            .then((data) => setEvents(data.slice(0, 3)));

            console.log(events)
            
    }, []);

    return(
        <blogContext.Provider value={{blogs, setBlogs, events, setEvents}}>
            {children}
        </blogContext.Provider>
    )
}
