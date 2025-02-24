import {get,put,post,del} from "../../utils"

export const getAllCategory =async ()=>{
    return await get("category")
}
