import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<Feed />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
