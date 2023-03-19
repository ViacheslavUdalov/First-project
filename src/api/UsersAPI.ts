import {APIResponse, GetUsersType, instance} from "./api";

export const userAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersType>
        (`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data
            }
        )
    },
    follow(userId: number) {
        return instance.post<APIResponse>('follow/' + userId).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete('follow/' + userId)
            .then(res => res.data) as Promise<APIResponse>
    }
}