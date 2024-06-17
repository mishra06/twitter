
import './App.css';
import Home from './components/Home';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="" element={<Feed />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
