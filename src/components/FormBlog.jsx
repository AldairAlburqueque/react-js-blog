import React from "react";

const FormBlog = () => {

  const [category, setCategory] = useState()

  const handleCategory = () => {
    const url = `http://localhost:8080/category/list`
    axios.get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err))  
  }

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
            <option value=""></option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FormBlog;
