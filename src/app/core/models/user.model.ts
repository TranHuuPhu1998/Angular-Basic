export interface UserRegister {
  firstName: string;
  surName: string;
  typeReg: string;
  phoneNumber: string;
  password: string;
  code: string;
}

export interface UserLogin {
  username: string;
  password: string;
  userId?: string;
}

export interface User {
  fullname: string;
  phoneNumber: string;
  emailAddress: string;
  avatar: {
    dir: string;
    full: string;
    medium: string;
    thumbnail: string;
  };
}
