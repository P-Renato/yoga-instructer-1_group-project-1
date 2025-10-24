
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";
import { ContextProvider } from './views/BlogContext.jsx';

createRoot(document.getElementById('root')).render(
    <HashRouter> 
        <ContextProvider>
         <App />
        </ContextProvider>
    </HashRouter>
)