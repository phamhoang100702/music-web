import {del, get, post, post_form_data, put, put_form_data, uploadFile} from "../../utils";

export const searchSongByKeyword = async (keyword = "",page = 0,size = 10) => {
    return await get(`song?keyword=${keyword}&page=${page}&size=${size}`, {});
};

export const saveSong = async (options) => {
    return await post_form_data("song", options);
};



export const deleteSongById = async (songId = "") => {
    return await del("song/" + songId);
};

export const updateSong = async (object) => {
    return await put_form_data("song", object);
};

// la singer hoac admin
export const getAllSongByCreatorId = async (creatorId) => {
    return await get(`song/by-singer/${creatorId}`);
};

export const getSongsByCreator = async () => {
    return await get(`song/by-creator`);
};

export const getAllSongBySingerId = async (singerId) => {
    return await get(`song/by-singer/${singerId}`);
};

export const uploadFileSound = async (formData) => {
    return await uploadFile("s3", formData);
};
export const getTopSongWithMostListensByCategory = async () => {
    return await get(`song/topByCategory`);
};
