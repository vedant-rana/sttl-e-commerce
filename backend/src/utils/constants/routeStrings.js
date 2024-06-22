export class RouteStrings {
  // BASIC URL prefix
  static BASE_URL = "/api/v1";

  //Base Routes
  static USER_URL = `${this.BASE_URL}/users`;
  static PRODUCT_URL = `${this.BASE_URL}/products`;
  static CART_URL = `${this.BASE_URL}/cart`;

  //Users Endpoints
  static LOGIN_USER = `/login`;
  static REGISTER_USER = `/register`;
  static LOGOUT_USER = `/logout`;
  static ALL_USERS = `/all`;
  static USER_SELF = `/me`;
  static USER_DETAILS = `/:id`;
  static DELETE_USER = `/:id`;
  static UPDATE_USER = `/:id`;

  //Product Endpoints
  static CREATE_PRODUCT = `/create`;
  static SINGLE_PRODUCT = `/:id`;
  static ALL_PRODUCTS = `/all`;

  //Cart Endpoints
  static CREATE_CART = `/create`;
  static SINGLE_CART = `/`;
}
