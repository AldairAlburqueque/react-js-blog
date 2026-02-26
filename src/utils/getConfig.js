// const config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };

// export default config;

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default config;
