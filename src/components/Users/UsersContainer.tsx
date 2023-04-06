import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../../common/preloader";
import {getIsFetching, getUsersState} from "./users-selector";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
type PropsType = {}
function UsersContainer (props: PropsType) {
    const isFetching = useSelector(getIsFetching)
               return <>
               {isFetching && <Preloader />}
               <Users />
        </>
    }
export default compose<React.ComponentType>(WithAuthRedirect)(UsersContainer);