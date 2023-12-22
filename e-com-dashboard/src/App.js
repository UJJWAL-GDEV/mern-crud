import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddStudent from "./components/AddStudent";
import Students from "./components/Students";
import Update from "./components/Update";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Students/>} />
            <Route path="/add" element={<AddStudent/>} />
            <Route path="/update/:id" element={<Update/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
