import { createContext,  useState, useEffect} from "react";
import API_BASE_URL from '../config/api.js'; 

export const blogContext = createContext(null)

export function ContextProvider({children}){
    const [blogs, setBlogs] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/blogs/all`)
            .then((res) => res.json())
            .then((data) => setBlogs(data.slice(0, 5)));
            console.log(blogs)

        fetch(`${API_BASE_URL}/events/all`)
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
