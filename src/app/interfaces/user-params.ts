export interface SignupParams {
  username: string;
  password: string;
  email: string;
  full_name?: string;
  user_id?: number;
}

export interface LoginParams {
  username: string;
  password: string;
}
