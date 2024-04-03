import "./App.css";
import { useState } from "react";
import Login from "./components/Login/Login";
import {BrowserRouter,Navigate,Outlet,Route,Routes} from "react-router-dom";
import ErrorPg from "./components/ErrorPage/ErrorPg";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/home/Home";
import StoreContextComp from "./context/StoreContextComp";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import AddNewBlog from "./components/AddNewBlog/AddNewBlog";
import SingleDetailedBlog from "./components/SingleDetailedBlog/SingleDetailedBlog";

// private route
const CustomRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="container-fluid">
      <StoreContextComp>
        {/* *****   My Application Routes **********/}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* Created private routes */}
            <Route path="/" element={<CustomRoute isLoggedIn={isLoggedIn} />}>
              {/* Added private routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/createBlog" element={<AddNewBlog />} />
              <Route path="/blog-detail/:id" element={<SingleDetailedBlog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreContextComp>
    </div>
  );
}

export default App;

// export const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPg />,
//     children: [{ path: "/", element: <Home/> }],
//   },
//   {
//     path: "/login",
//     element:<Login/>
//   }
// ]);
