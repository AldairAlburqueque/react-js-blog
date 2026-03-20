import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogIdThunk } from "../store/slices/blogs.slice";

const BlogDetail = () => {
  const { id } = useParams();
  const { blog } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(blog);

  useEffect(() => {
    dispatch(blogIdThunk);
  }, [id]);

  return <div>BlogDetail</div>;
};

export default BlogDetail;
