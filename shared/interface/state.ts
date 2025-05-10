import { IAuthState } from '@/shared/interface/auth';

export interface IAction {
  type: string;
  payload: any;
  [key: string]: any;
}

export interface State {
  auth: IAuthState;
}

export interface IObj {
  [key: string]: string;
}
