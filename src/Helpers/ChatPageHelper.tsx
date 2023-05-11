import {UserType} from "../types/Types";
import {getCurrentUser} from "../components/Users/users-selector";
import {useAppSelector} from "../redux/redux-store";

export const idWithIndex = (index: number | string) => {
    const date = new Date()
    let result = String(date.getTime())
    result = result + '_' + index
    return result
}
