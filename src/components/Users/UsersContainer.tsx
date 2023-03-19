import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../../common/preloader";
import {getIsFetching} from "./users-selector";
type PropsType = {}
function UsersContainer (props: PropsType) {
    const isFetching = useSelector(getIsFetching)
           return <>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    }
export default UsersContainer;