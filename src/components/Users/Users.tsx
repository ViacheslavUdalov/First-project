import User from "./User";
import Paginator from "../../Helpers/Paginator";
import React, {useEffect} from "react";
import {FilterType, follow as followThunk, getUsers, unfollow as unfollowThunk} from "../../redux/user-reducer";
import UsersForm from "./Users-Form";
import {
    getCurrentPage,
    getFilter,
    getFollowingProcess,
    getPageSize,
    getTotalCount,
    getUsersState
} from "./users-selector";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {UserType} from "../../types/Types";
import {useSearchParams} from "react-router-dom";

type Props = {}
const Users: React.FC<Props> = (props) => {
    const users = useAppSelector(getUsersState)
    const pageSize = useAppSelector(getPageSize)
    const totalCount = useAppSelector(getTotalCount)
    const currentPage = useAppSelector(getCurrentPage)
    const followingProcess = useAppSelector(getFollowingProcess)
    const filter = useAppSelector(getFilter)

    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    // const postQuery = searchParams.get('term') || ''

    useEffect(() => {
        let result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value2 === 'true') {
                value2 = true
            } else if (value2 === 'false') {
                value2 = false
            }
            result[key] = value2
        }
        let actualPage = result.page || currentPage
        let term = result.term || filter.term
        let friend = result.friend || filter.friend
        if (result.friend === false) {
            friend = result.friend
        }
        const actualFilter = {term, friend}
         dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const term = filter.term
        const friend = filter.friend
        let URLQuery =
            (term === "" ? "" : `&term=${term}`)
        + (friend === null ? '' : `&friend=${friend}`)
        + (currentPage === 1 ? '' : `&page=${currentPage}`)
        setSearchParams(URLQuery)
        // eslint-disable-next-line
    }, [filter, currentPage])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }
    return <div>
        <Paginator totalItemsCount={totalCount}
                   pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        <div>
            <UsersForm />
        </div>
        <div>
            {users.map((u: UserType) => <User key={u.id}
                                              user={u}
                                              followingProcess={followingProcess}
                                              follow={follow}
                                              unfollow={unfollow}
                />
            )
            }
        </div>
    </div>
}
export default Users;