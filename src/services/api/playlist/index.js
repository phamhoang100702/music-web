import {del, get, post, put} from "../../utils";

// them cai creator
export const savePlaylistForUser = async (object) => {
  const playlist = {
    ...object,
    role: "USER",
  };
  return await post("playlist", playlist);
};

export const getPlaylistByPlaylistId = async (playlistId) => {
  return await get(`playlist/${playlistId}`);
}

export const savePlaylistForMainPage = async (object) => {
  const playlist = {
    ...object,
    role: "MAINPAGE",
  };
  return await post("playlist", playlist);
};
export const getFavoritePlaylistByUserId = async () => {
  return await get(`playlist/favorite`);
};

export const getAllPlaylistByUserId = async (userId) => {
  return await get(`playlist/get-owned-playlist/${userId}`);
};

// main page user/ censor
export const getAllMainpagePlayList = async () => {
  return await get("playlist/mainpage");
};
// search for user
export const searchAllPlaylistByNameForUser = async (keyword = "",page = null, size = null) => {
  return await get(`playlist?keyword=${keyword}&size=${size}&page=${page}`);
};

export const updatePlaylist = async (options) => {
  return await put("playlist", options);
};

export const deletePlaylist = async (playlistId) => {
  return await del(`playlist/${playlistId}`);
};

// get all  Song
export const getAllSongByPlaylistId = async (id) => {
  return await get(`playlist/song/${id}`);
};

export const addSongToPlaylist = async (playlistId, songId) => {
  return await post(`playlist/${playlistId}/song/${songId}`);
};
// add array to playlist
export const addSongsToPlaylist = async (playlistId, object) => {
  return await post(`playlist/${playlistId}/song`, object);
};

export const removeSongFromPlaylist = async (playlistId, songId) => {
  return await del(`playlist/${playlistId}/song/${songId}`);
};

export const getTotalPlaylist = async () => {
  return await get(`playlist/count`);
};


export const addSongToFavoritePlaylist = async (songId) => {
  return await post(`playlist/favorite/${songId}`, {});
};

export const removeSongToFavoritePlaylist = async (songId) => {
  return await del(`playlist/favorite/${songId}`)
}
