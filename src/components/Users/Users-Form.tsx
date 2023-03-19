import { useForm } from "react-hook-form";
import {FilterType} from "../../redux/user-reducer";
import React from "react";

type PropsType = {
    onSubmit: (values: any) => void
}

export default function UsersForm(props: PropsType) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit = {handleSubmit(props.onSubmit)}>
            <input {...register("term")} />
            <select {...register("friend")}>
                <option value="null">All</option>
                <option value="true">Friends</option>
                <option value="false">Not friends</option>
            </select>
            <input type="submit" />
        </form>
    );
}