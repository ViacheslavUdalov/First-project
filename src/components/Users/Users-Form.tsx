import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FilterType, getUsers} from "../../redux/user-reducer";
import React from "react";
import {AppStateType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {getFilter, getPageSize} from "./users-selector";
import {TypedUseSelectorHook, useSelector} from "react-redux";

type PropsType = {}
// type FormValuesType = {
//     term: string
//     friend: string
// }
export default function UsersForm(props: PropsType) {
    const filter = useAppSelector(getFilter)
    const {register, handleSubmit, reset} = useForm<FilterType>(
        {
            defaultValues: {
                term: filter.term,
                friend: filter.friend
            }
        }
    )
    const pageSize = useAppSelector(getPageSize)
    const dispatch = useAppDispatch()
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onFilterChanged)}>
            <input {...register("term")} />
            <select {...register("friend")}>
                <option value="null">All</option>
                <option value="true">Friends</option>
                <option value="false">Not friends</option>
            </select>
            <input type="submit"/>
        </form>
    );
}