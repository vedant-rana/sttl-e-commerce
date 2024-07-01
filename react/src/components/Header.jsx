import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/reducers/cartReducers";
import { logoutUser } from "../redux/reducers/userReducer";
import { useAlert } from "./AlertProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  // getting user from store
  const { user } = useSelector((state) => state.userData);
  const { cartItems } = useSelector((state) => state.cartData);

  const dispatch = useDispatch();
  const showAlert = useAlert();

  // function to handle logout user
  const handleLogout = () => {
    // removeing user from store
    dispatch(logoutUser());

    // clearing personal cart of user because user has logged out
    dispatch(clearCart());
    showAlert("Use Logged Out Successfully ", "success");
  };

  return (
    <>
      <header className="flex fixed z-30 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-black text-sm py-5">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
          aria-label="Global"
        >
          <Link
            className="sm:order-1 flex-none text-2xl font-semibold text-white"
            to={"/"}
          >
            <img src="/logo.svg" className="text-white  h-[1.5rem]" />
          </Link>
          <div className="sm:order-3 flex items-center gap-x-2">
            <button
              type="button"
              className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-700 bg-black text-gray-400 shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            {user !== null ? (
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-black text-gray-400 shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleLogout}
              >
                <ExitToAppIcon />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-black text-gray-400 shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Link to={"/login"} className="text-[1rem]">
                    Login
                    {/* <AccountCircleIcon /> */}
                  </Link>
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-black text-gray-400 shadow-sm hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Link to={"/register"} className="text-[1rem]">
                    SignUp
                    {/* <AccountCircleIcon /> */}
                  </Link>
                </button>
              </>
            )}
          </div>
          <div
            id="navbar-alignment"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <Link
                className="font-medium text-xl text-gray-400 hover:text-gray-200 py-2"
                to={"/"}
              >
                Home
              </Link>
              <Link
                className="font-medium text-xl text-gray-400 hover:text-gray-200 py-2"
                to={"/products"}
              >
                Products
              </Link>
              <Link
                className="font-medium text-xl text-gray-400 hover:text-gray-200 py-2"
                to={"/contact"}
              >
                Contact
              </Link>
              <Link
                className="font-medium text-xl text-gray-400 hover:text-gray-200 relative pr-3 py-2 z-4"
                to={"/cart"}
              >
                {cartItems && cartItems.length > 0 ? (
                  <span className="absolute text-[0.9rem] leading-[8px] top-1 right-0 z-2 bg-gray-300 text-gray-800 p-[0.3rem] rounded-full">
                    {cartItems.length}
                  </span>
                ) : null}
                <ShoppingCartIcon />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
