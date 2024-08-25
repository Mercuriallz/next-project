export interface LoginFormData {
  username: string;
  password: string;
}

export interface ResponseLoginSuccess {
  error: boolean;
  message: string;
  data: ResponseLoginData;
  token: string;
}

export interface ResponseLoginData {
  id: number;
  nama: string;
  role: number;
  id_region: number;
  picture: string;
  username: string;
  id_role: string;
}

export interface LoginDataResponse {
  token:        string;
  refreshToken: string;
  id:           number;
  username:     string;
  email:        string;
  firstName:    string;
  lastName:     string;
  gender:       string;
  image:        string;
}

