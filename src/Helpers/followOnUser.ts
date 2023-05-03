export const MapingUsers = (items: any, objId: any, itemId: number, newObjProps: any) => {
   return  items.map((u: any) => {
            if (u[objId] === itemId) {
                return {...u, ...newObjProps}
            }
            return u;
        }
    )
}
// export const currentUser = (items: any, objId: any, itemId: number) => {
//    return  items.map((u: any) => {
//             if (u[objId] === itemId) {
//                 return u;
//                 console.log(u)
//             }
//             return u
//        console.log(u)
//         }
//     )
// }
