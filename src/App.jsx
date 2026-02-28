import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Headers";
import ProtecteRoutes from "./pages/ProtecteRoutes";
import { CreateBlog } from "./pages/CreateBlog";
import BlogMe from "./pages/BlogMe";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtecteRoutes />}>
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/blog/me" element={<BlogMe />} />
        </Route>
        <Route path="/blog/category/:id" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
