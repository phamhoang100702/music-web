import {del, get, post, put, uploadFile} from "../../utils";

//TODO:
export const updateSinger = async (object = {}) => {
    return await put("user", object);
};

export const getAllActiveSinger = async (name = "", page = 0, size = 10) => {
    return await get(`user/singer?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
};


export const uploadAvatar = async (formData) => {
    return await uploadFile("s3/avatar", formData);
};
// top singer
export const getTopSinger = async (top) => {
    return await get(`singer/top/${top}`);
};

export const getFollowedSinger = async (id) => {
    return await get(`follower/followed-singers/${id}`)
}
export const getListFollower = async (id) => {
    return await get(`follower/total-followers/${id}`)
}
export const addFollow = async (singerId) => {
    return await post(`follower/follow/${singerId}`)
}
export const removeFollow = async (singerId) => {
    return await del(`follower/unfollow/${singerId}`)
}
