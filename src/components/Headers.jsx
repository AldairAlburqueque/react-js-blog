import { Link } from "react-router-dom";
import { User, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth.slice";

const Header = () => {
  // const [name, setName] = useState("");

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const nameUser = localStorage.getItem("name");
  //   if (nameUser) {
  //     setName(nameUser);
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(logout());
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-700 font-mono">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <div className="border border-amber-400 p-1 text-amber-400">BC</div>
          <h1 className="text-xl text-amber-400 tracking-wide">BlogCer</h1>
        </div>

        {/* Categorías */}
        <nav className="hidden md:flex gap-6 text-sm text-zinc-300 m-4">
          <Link
            to="/category/tech"
            className="hover:text-amber-400 transition-colors"
          >
            Tech
          </Link>
        </nav>

        {/* Buscador */}
        <div className="hidden md:flex items-center bg-zinc-800 border border-zinc-700 px-3 py-1">
          <Search size={16} className="text-zinc-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-zinc-300 text-sm w-40"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          {/* Perfil */}
          <button className="text-zinc-400 hover:text-amber-400 transition-colors">
            <User size={20} />
          </button>

          {!user ? (
            <div>
              {/* Sign In */}
              <Link
                to="/auth/login"
                className="text-sm text-cyan-400 hover:text-amber-400 transition-colors"
              >
                SIGN_IN
              </Link>
              {/* Register */}
              <Link
                to="/auth/register"
                className="text-sm border border-amber-400 text-amber-400 px-3 py-1 
                       hover:bg-amber-400 hover:text-black transition-colors"
              >
                REGISTER
              </Link>
            </div>
          ) : (
            <div>
              <div>{user}</div>
              <button
                onClick={handleLogout}
                className="text-sm border border-amber-400 text-amber-400 px-3 py-1 
                      hover:bg-amber-400 hover:text-black transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
