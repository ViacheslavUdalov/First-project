import User from "./User";
import React, {useEffect, useState} from "react";
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
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
import arrowToTop from '../../common/images/top-arrow-icon-0.jpg'
import styles from './Users.module.css'

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
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        let result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            // console.log(typeof value2)
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
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const onPageChanged: PaginationProps['onChange'] = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
        scrollToTop()
    }
    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }

    const makeVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 200) {
            setVisible(true)
        } else if (scrolled < 200) {
            setVisible(false)
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    useEffect(() => { window.addEventListener('scroll', makeVisible)
    }, [])

    return <div>
        <span className={styles.totalCount}>
           Всего пользователей: {totalCount}
        </span>
        <div className={styles.inputSearch}>
            <UsersForm onFilterChanged={onFilterChanged} filter={filter}/>
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
         <div>
            <img src={arrowToTop} className={styles.arrow} onClick={scrollToTop}
            style={{visibility: visible ? "visible" : "hidden"}}
            />
        </div>
        <div className={styles.paginator}>
            <Pagination
                total={totalCount}
                pageSize={pageSize}
                defaultCurrent={1}
                onChange={onPageChanged}/>
        </div>
    </div>
}
export default React.memo(Users)
