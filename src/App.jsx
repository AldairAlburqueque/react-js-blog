import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Headers";
import ProtecteRoutes from "./pages/ProtecteRoutes";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Routes element={<ProtecteRoutes />}>
          <Route  path="/blog/create" element={<CreteBlog />}/>
        </Routes> 
      </Routes>
    </div>
  );
}

export default App;
