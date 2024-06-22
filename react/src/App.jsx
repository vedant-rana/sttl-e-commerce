import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import { userExist } from "./redux/reducers/userReducer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(userExist());
  }, []);
  return (
    <>
      <Header />
      {/* <h1 className="text-3xl font-bold underline text-red-500 text-center">Hello world!</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <Signup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
