const config = {
  headers: {
    Authentication: `Bearer ${localStorage.getItem("token")}`,
  },
};

export default config;
