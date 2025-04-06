import {getLocalStorage} from "../localStorage";
import {CLIENT_ERROR, SUCCESS} from "../../constants/status.js";

const API_DOMAIN = "http://localhost:8888/api/v1/";


export const getDataResponse = async (response) => {
    if (response.status == SUCCESS) {
        return await response.json();
    } else if (response.status == CLIENT_ERROR) {
        return null;
    }else{
        return 1;
    }
}

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${getLocalStorage("user-token")}`
        }
        // header
    });
    return getDataResponse(response);
};

export const post = async (path, options = {}) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalStorage('user-token')}`
        },
        body: JSON.stringify(options),
    });
    return getDataResponse(response);
};

export const post_form_data = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        body: options,
        headers: {
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
    });
    return getDataResponse(response);
};

export const put = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
        body: JSON.stringify(options),
    });
    return getDataResponse(response);
};


export const put_form_data = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT",
        body: options,
        headers: {
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
    })
    return getDataResponse(response);
};

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            "Content-Type": `application/json`,
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        }
    });
    if (!response.ok) {
        return getDataResponse(response);
    }
};

export const uploadFile = async (path, formData) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
        body: formData
    })
    return getDataResponse(response);
}


