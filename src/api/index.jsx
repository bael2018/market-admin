import { API } from './api'

export const createNewClothes = (data , cat , clothes) => {
    return API.post(JSON.stringify(data) , cat , clothes)
}

export const getClothes = (cat , clothes ,id) => {
    return API.get(cat , clothes ,id)
}

export const deleteClothe = (cat , clothes , id) => {
    return API.delete(cat, clothes , id)
}

export const changeClothes = (data , cat , clothes , id) => {
    return API.patch(JSON.stringify(data) , cat , clothes , id)
}