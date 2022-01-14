import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'e4ad9ab2-0748-4bae-b98a-bc29299eb06d'
    }
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
};

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  resultCode: RC;
  messages: Array<string>;
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
