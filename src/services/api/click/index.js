import {post,get} from "../../utils"

export const saveListen = async(object)=>{
    return await post("listen",object);
}

export const countClickByDay = async ()=>{
    return await get("listen/top-of-the-day");
}

export const countClickByMonth =async ()=>{
    return await get("listen/top-of-the-month");
}
export const countClickByWeek = async()=>{
    return await get("listen/top-of-the-week");
}

export const countClickAll =async ()=>{
    return await get("click/all");
}

export const getTotalClick =async ()=>{
    return await get("click/count");
}


/// get top song
