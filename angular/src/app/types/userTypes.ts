// required fields to register user
export type regiterUserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

// required fields to login user
export type loginUserType = {
  email: string;
  password: string;
};
