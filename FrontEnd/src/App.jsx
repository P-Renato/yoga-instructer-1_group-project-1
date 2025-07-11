import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Mainpage from './components/Homepage/Mainpage';
import Adminpage from './components/Adminpage/Adminpage';
import Login from "./components/Adminpage/Login";
import EditAdmin from "./views/AdminPage/EditAdmin";
import MoreInfo from "./views/AdminPage/MoreInfo";
import EventList from "./views/AdminPage/EventList";
import BlogList from "./views/AdminPage/BlogList";
import EditBlog from "./views/AdminPage/EditBlog";
import EditEvent from "./views/AdminPage/EditEvent";
import  BlogContent  from "./views/BlogContent.jsx"
import AddBlog from "./views/AdminPage/AddBlog.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path='blog-content/:id' element={<BlogContent/>} />
      <Route path='admin' element={loggedIn ? <Adminpage /> : <Login setLoggedIn={setLoggedIn} />}>
          <Route path='editAdmin' element={<EditAdmin />} />

          <Route path='eventList' element={<EventList />} />
          <Route path="editEvent" element={<EditEvent />} />
          <Route path="editEvent/:eventId" element={<EditEvent />} />

          <Route path='blogList' element={<BlogList />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="editBlog/:blogId" element={<EditBlog />} />
          
          <Route path='moreInfo' element={<MoreInfo />} />
      </Route>
    </Routes>
  );
}

export default App;