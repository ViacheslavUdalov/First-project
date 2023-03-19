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

type Props = {}
const Users: React.FC<Props> = (props) => {
    const onSubmit = (values: FormType) => onFilterChanged(values);
    type FormType = {
        term: string
        friend: null | boolean
    }
    const users = useAppSelector(getUsersState)
    const pageSize = useAppSelector(getPageSize)
    const totalCount = useAppSelector(getTotalCount)
    const currentPage = useAppSelector(getCurrentPage)
    const followingProcess = useAppSelector(getFollowingProcess)
    const filter = useAppSelector(getFilter)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
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
            <UsersForm onSubmit={onSubmit}/>
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