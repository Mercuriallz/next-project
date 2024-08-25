export interface SortInterface {
    id:           number;
    username:     string;
    email:        string;
    firstName:    string;
    lastName:     string;
    gender:       string;
    image:        string;
    token:        string;
    refreshToken: string;
}

export interface LoginInterface {
    username: string;
    password: string;
}
