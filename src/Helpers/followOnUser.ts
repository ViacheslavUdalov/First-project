export const MapingUsers = (items: any, objId: any, itemId: any, newObjProps: any) => {
   return  items.map((u: any) => {
            if (u[objId] === itemId) {
                return {...u, ...newObjProps}
            }
            return u;
        }
    )
}
