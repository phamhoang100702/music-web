import {del, get, post, put, uploadFile} from "../../utils";

export const getAllActiveSong = async (name = "") => {
    const status = 2;
    return await get(`song?status=${status}&name=${name}`);
};

export const saveSong = async (options) => {
    return await post("song", options);
};

export const deleteSongById = async (songId = "") => {
    return await del("song/" + songId);
};

export const updateSong = async (object) => {
    return await put("song", object);
};

// la singer hoac admin
export const getAllSongByCreatorId = async (creatorId) => {
    return await get(`song/by-singer/${creatorId}`);
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
