export type RegisterRequest = {
  name:string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
};
