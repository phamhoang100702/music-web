export const convertStringToArray = (str, separator) => {
    return str != null && str.split(separator);
}

export const convertSingersToSingerOption = (singers) => {
    return singers.map(singer => {
        return {
            value: singer.id
        }
    })
}
