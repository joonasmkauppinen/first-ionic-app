import { LoginUserInfo } from './LoginUserInfo';

export interface LoginResponse {
  message: string;
  token: string;
  user: LoginUserInfo;
}
