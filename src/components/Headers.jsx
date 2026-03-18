import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth.slice";
import axios from "axios";
import { searchBlogThunk, getAllBlogThunk } from "../store/slices/blogs.slice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { blogs } = useSelector((state) => state);

  useEffect(() => {
    const url = `http://localhost:8080/category/list`;

    axios
      .get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const hangleSearch = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    dispatch(searchBlogThunk(input));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(logout());
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 font-mono sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => dispatch(getAllBlogThunk())}
          className="flex items-center gap-3 group"
        >
          <div className="border border-amber-400 px-2 py-1 text-amber-400 font-bold tracking-widest group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
            BC
          </div>
          <h1 className="text-lg md:text-xl text-amber-400 tracking-wider group-hover:text-amber-300 transition-colors">
            BlogCer
          </h1>
        </Link>

        {/* Botón hamburguesa (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-amber-400"
        >
          ☰
        </button>

        {/* NAV Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Categorías */}
          <div className="relative">
            <h4
              onClick={() => setOpen(!open)}
              className="cursor-pointer text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Categorías
            </h4>

            {open && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 shadow-lg rounded-md overflow-hidden z-50">
                {category?.map((cat) => (
                  <li key={cat.idCategory}>
                    <Link
                      to={`/blog/category/${cat.idCategory}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-300 hover:bg-amber-400 hover:text-black transition-colors"
                    >
                      {cat.categoria}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buscador */}
          <div className="flex items-center bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-sm focus-within:border-amber-400 transition-all duration-300">
            <form onSubmit={hangleSearch} className="flex items-center gap-2">
              <input
                type="text"
                name="search"
                placeholder="Buscar..."
                className="bg-transparent outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-40"
              />
              <button className="text-amber-400 text-sm">🔍</button>
            </form>
          </div>

          {/* Acciones */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/auth/login"
                className="text-sm text-zinc-400 hover:text-amber-400"
              >
                SIGN IN
              </Link>

              <Link
                className="text-sm border border-amber-400 text-amber-400 px-4 py-1.5 hover:bg-amber-400 hover:text-black transition-all duration-300"
                to="/auth/register"
              >
                REGISTER
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div
                onClick={() => navigate("/blog/me")}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-3 py-1.5 cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                <span className="text-amber-400">👤</span>
                <span className="text-sm text-zinc-300">{user}</span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm border border-amber-400 text-amber-400 px-4 py-1.5 hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-zinc-950 border-t border-zinc-800">
          {/* Buscador */}
          <form onSubmit={hangleSearch} className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Buscar..."
              className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-300 outline-none"
            />
            <button className="text-amber-400">🔍</button>
          </form>

          {/* Categorías */}
          <div>
            <p className="text-zinc-400 mb-2">Categorías</p>
            <ul className="space-y-1">
              {category?.map((cat) => (
                <li key={cat.idCategory}>
                  <Link
                    to={`/blog/category/${cat.idCategory}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-zinc-300 hover:bg-amber-400 hover:text-black"
                  >
                    {cat.categoria}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Acciones */}
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/auth/login" className="text-zinc-300">
                SIGN IN
              </Link>
              <Link to="/auth/register" className="text-amber-400">
                REGISTER
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/blog/me")}
                className="text-zinc-300 text-left"
              >
                👤 {user}
              </button>
              <button
                onClick={handleLogout}
                className="text-amber-400 text-left"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
