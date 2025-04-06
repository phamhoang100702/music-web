export const handleFollowedSinger = (state = [], actions) => {
    switch (actions.type) {
        case "UPDATE_FOLLOWED_SINGER":
            return actions.followedSinger;
        case "ADD_ONE_SINGER_TO_FOLLOWED_SINGER":
            return [...state, actions.theSingerNeedToAdd];
        case "REMOVE_ONE_SINGER_FROM_FOLLOWED_SINGER":
            return state.filter(i => i.id !== actions.theSingerNeedToRemove.id);
        case "SINGER_QUEUE_CLEAR":
            return [];
        default:
            return state;
    }
}
