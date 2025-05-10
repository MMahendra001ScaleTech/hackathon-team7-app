export interface IUserData {
  id: any;
  email: string;
  name: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface IAuthState {
  auth: boolean;
  userData: IUserData;
}

export interface IUserDataList {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  firstName: string;
  lastName: string;
}
