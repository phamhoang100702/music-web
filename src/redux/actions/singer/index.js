export const updateFollowedSinger = (followedSinger) => {
    return {
        type: "UPDATE_FOLLOWED_SINGER",
        followedSinger: followedSinger
    }
}

export const addOneSingerToFollowedSinger = (theSingerNeedToAdd) => {
    return {
        type: "ADD_ONE_SINGER_TO_FOLLOWED_SINGER",
        theSingerNeedToAdd: theSingerNeedToAdd
    }
}
export const removeOneSingerFromFollowedSinger = (theSingerNeedToRemove) => {
    return {
        type: "REMOVE_ONE_SINGER_FROM_FOLLOWED_SINGER",
        theSingerNeedToRemove: theSingerNeedToRemove
    }
}

export const clearSingerQueue = () => {
    return {
        type: "SINGER_QUEUE_CLEAR"
    }
}
