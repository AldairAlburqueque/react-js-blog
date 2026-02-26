import React, { useEffect, useState } from "react";
import axios from "axios";

const FormBlog = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const url = `http://localhost:8080/category/list`;

    console.log({ category });
    axios
      .get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Content</label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Categoría</label>
          <select>
            {category.map((cat) => (
              <option value="" key={cat.id}>
                {cat.categoria}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FormBlog;
