export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
};
