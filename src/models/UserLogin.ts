export type UserLogin = {
  user: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    address: string;
  };
  token: string;
};
