import { Link } from "react-router-dom";
import { User, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth.slice";
import axios from "axios";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const url = `http://localhost:8080/category/list`;

    axios
      .get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(logout());
  };
  console.log(category);
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 font-mono sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="border border-amber-400 px-2 py-1 text-amber-400 font-bold tracking-widest group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
            BC
          </div>
          <h1 className="text-xl text-amber-400 tracking-wider group-hover:text-amber-300 transition-colors">
            BlogCer
          </h1>
        </Link>

        {/* Categorías */}
        <div className="relative">
          <h4
            onClick={() => {
              setOpen(!open);
            }}
          >
            Categorías
          </h4>

          {open && (
            <ul className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 shadow-lg">
              {category?.map((cat) => (
                <Link
                  to={`blog/category/${cat.idCategory}`}
                  key={cat.idCategory}
                  className="px-4 py-2 text-sm text-zinc-300 hover:bg-amber-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {cat.categoria}
                </Link>
              ))}
            </ul>
          )}
        </div>

        {/* Buscador */}
        <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-sm focus-within:border-amber-400 transition-all duration-300">
          <Search size={16} className="text-zinc-500 mr-2" />
          <input
            type="text"
            placeholder="Search articles..."
            className="bg-transparent outline-none text-zinc-300 text-sm w-48 placeholder:text-zinc-600"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-5">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/auth/login"
                className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
              >
                SIGN IN
              </Link>

              <Link
                to="/auth/register"
                className="text-sm border border-amber-400 text-amber-400 px-4 py-1.5 
              hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                REGISTER
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-3 py-1.5">
                <User size={16} className="text-amber-400" />
                <span className="text-sm text-zinc-300 tracking-wide">
                  {user}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm border border-amber-400 text-amber-400 px-4 py-1.5 
              hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
