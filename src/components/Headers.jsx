import { Link, useNavigate } from "react-router-dom";
import { User, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth.slice";
import axios from "axios";
import { searchBlogThunk, getAllBlogThunk } from "../store/slices/blogs.slice";
import { API_URL } from "../utils/url";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const { blogs } = useSelector((state) => state);
  console.log(blogs);

  useEffect(() => {
    const url = `http://localhost:8080/category/list`;

    axios
      .get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (search.trim() !== "") {
      dispatch(searchBlogThunk(search));
      setOpenSearch(true);
    } else {
      dispatch(getAllBlogThunk());
      setOpenSearch(false);
    }
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(logout());
  };

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
        <div className="relative inline-block">
          <h4
            onClick={() => setOpen(!open)}
            className="cursor-pointer select-none"
          >
            Categorías
          </h4>

          {open && (
            <ul
              className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border
                          border-zinc-700 shadow-lg rounded-md overflow-hidden z-50"
            >
              {category?.map((cat) => (
                <li key={cat.idCategory}>
                  <Link
                    to={`/blog/category/${cat.idCategory}`}
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-amber-400 hover:text-black transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {cat.categoria}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buscador */}
        <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-sm focus-within:border-amber-400 transition-all duration-300">
          <Search size={16} className="text-zinc-500 mr-2" />
          {/* <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar blog...."
          /> */}

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar blog..."
              className="bg-transparent outline-none text-zinc-300 text-sm w-48 placeholder:text-zinc-600"
            />
            {openSearch && blogs?.content?.length > 0 && (
              <ul className="absolute top-full left-0 w-72 mt-2 bg-zinc-900 border border-zinc-700 shadow-lg z-50 max-h-60 overflow-y-auto">
                {blogs?.content.map((blog) => (
                  <li
                    key={blog.idBlog}
                    onClick={() => {
                      navigate(`blog/${blog.idBlog}`);
                      setOpenSearch(false);
                      setSearch("");
                    }}
                    className="px-4 py-2 text-sm text-zinc-300 hover:bg-amber-400 hover:text-black cursor-pointer transition-colors"
                  >
                    {blog.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
              <div
                onClick={() => navigate("/blog/me")}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-3 py-1.5 cursor-pointer hover:bg-zinc-800 transition-colors"
              >
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
