import {Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import {ViewProducts} from "./pages/ViewProducts";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";
import "./App.css"
import UserProfile from "./pages/UserProfile"
const App = () => {
  return (

  <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/pages/AddProduct" element={<AddProduct />}/>
         */}
         <Route path="/AddProducts" element={<AddProducts />} />
         <Route path="/ViewProducts" element={<ViewProducts />} />
         <Route path="/profile" element={<UserProfile/>}/>

      </Routes>
      <Footer />

  </div>
  );
};

export default App;
