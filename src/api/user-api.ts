import { GetItemsType, APIResponseType, instance } from "./api";
// import { profileAPI } from "./profile-api";

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data) as Promise<APIResponseType>;
  },
};
