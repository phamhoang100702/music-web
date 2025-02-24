import {get, put, post, del, put_form_data} from "../../utils"

export const searchAllUser = async (name) => {
    return await get(`user?name=${name}`);
}

export const getUserById = async (id) => {
    return await get(`user/${id}`);
}

export const updateUser = async (obj) => {
    return await put(`user`, obj);
}

export const updateUserWithFormData = async (obj) => {
    return await put_form_data('user/change-information', obj);
}

export const changePassword = async (obj) => {
    return await put("user/change-password", obj);
}


export const getHistoryByUserId = async (id) => {
    return await get(`listen/history/${id}`);
}

export const getUserInformation = async (token) => {
    return await post("user/information", {
        token: token
    })
}
