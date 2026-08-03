import { type AxiosResponse } from 'axios';

export type SignUpData = {
  title: string;
  email: string;
  password: string;
};

export type SignUpOptions = {
  csrfToken?: string;
};

export type SignUpResult = {
  response: AxiosResponse;
  cookie: string;
};
