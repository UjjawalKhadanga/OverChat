import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from "./pages/Home";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  { path: '/', Component: LoginPage },
  { path: '/register', Component: RegisterPage },
  { path: '/home', Component: Home },
  { path: '/chat/:roomId', Component: Chat },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
