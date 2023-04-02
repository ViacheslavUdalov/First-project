import {useForm} from "react-hook-form";
import {FilterType} from "../../redux/user-reducer";
import React from "react";
import styles from './Users.module.css'
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
}
export default function UsersForm({onFilterChanged, filter}: PropsType) {

    const {register, handleSubmit} = useForm<FilterType>(
        {
            defaultValues: filter
        }
    )
    // useEffect(() => {
    //     reset({
    //         term: filter.term,
    //         friend: filter.friend
    //     }, [filter])
    // })
    const submit = (values: FilterType) => {
        const filter2 = {
            term: values.term,
            friend: values.friend
        }
        onFilterChanged(filter2)
    }
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(submit)}>
                <input {...register("term")} placeholder={'Вы можете найти своих друзей'} className={styles.input}/>
                <select  {...register("friend")} className={styles.select}>
                    <option className={styles.selection} value="null">All</option>
                    <option className={styles.selection} value="true">Friends</option>
                    <option className={styles.selection} value="false">Not friends</option>
                </select>
               <input type={'submit'} className={styles.submit}/>
            </form>
        </div>
    );
}