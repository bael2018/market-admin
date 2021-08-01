export const arrayFunc = el => {
    return Object.entries(el).map(item => {
        const id = item[0];
        return {
            ...item[1],
            id
        }
    })
}

export const singleArray = el => {
    return Object.values(el).map(item => {
        return item.name
    })
}