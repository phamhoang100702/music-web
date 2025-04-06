import {combineReducers} from "redux";
import {handleAuth} from "./auth/index.js";
import {handleSongQueue} from "./songQueue/index.js";
import {handleFavorite} from "./favorite/index.js";
import {handlePlaylist} from "./playlist/index.js";
import {handleLyric} from "./lyric/index.js";
import {handleFollowedSinger} from "./singer/index.js";

export const allReducer = combineReducers({
  auth: handleAuth,
  singer: handleFollowedSinger,
  songQueue: handleSongQueue,
  favorite: handleFavorite,
  playlist: handlePlaylist,
  lyric: handleLyric
});
