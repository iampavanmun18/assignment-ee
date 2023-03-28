// export const Fetch_User = (item) => {

//     console.log('item', item)
//     return {
//         type: "ADD_USER",
//         payload: item
//     }
// }

//remove_items

export const DLT = (id) => {
    console.log("id",id)
    return {
        type: "RMV_CART",
        payload: id
    }
}

export const EDT = (id) => {
    console.log("id",id)
    return {
        type: "EDT_CART",
        payload: id
    }
}





// export const REMOVE = (item)=>{
//     return {
//         type : "RMV_ONE",
//         payload : item
//     }
// }
