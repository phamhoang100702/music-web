import {del, get, post, put, uploadFile} from "../../utils";

//TODO:
export const updateSinger = async (object = {}) => {
    return await put("user", object);
};

export const getAllSinger = async (name ) => {
    return await get(`user/singer/get-all`)
}

export const searchSingersByKeyword = async (keyword = "", page = null, size = null) => {
    return await get(`user/singer?keyword=${keyword}&page=${page}&size=${size}`);
}


export const uploadAvatar = async (formData) => {
    return await uploadFile("s3/avatar", formData);
};
// top singer
export const getTopSinger = async (top) => {
    return await get(`follower/top-singer/${top}`);
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
