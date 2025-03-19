type UserType = User & { isAdmin: boolean };

// Sign Up
type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  otp: string;
};

type SignInType = {
  email: string;
  password: string;
};
