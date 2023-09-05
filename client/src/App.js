import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from "./pages/Home";
import Chat from "./pages/Chat";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/chat/:roomId" element={<Chat/>} />
        </Routes>
      </div>
  );
}

export default App;
