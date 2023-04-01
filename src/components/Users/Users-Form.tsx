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
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input {...register("term")} className={styles.input}/>
                <select {...register("friend")}>
                    <option value="null">All</option>
                    <option value="true">Friends</option>
                    <option value="false">Not friends</option>
                </select>
                <input type="submit"/>
            </form>
        </div>
    );
}


// <Input className={styles.input}
//        value={filter}
//        size="large" placeholder="Вы можете найти своих друзей"
//        prefix={<UserOutlined />} />
// <Box sx={{ minWidth: 120 }}>
//     <FormControl fullWidth>
//         <InputLabel id="friend">выбор</InputLabel>
//         <Select
//             labelId="friend"
//             id="friend"
//             value={filter.friend}
//             label="friend"
//         >
//             <MenuItem value={"null"}>All</MenuItem>
//             <MenuItem value={"true"}>Friends</MenuItem>
//             <MenuItem value={"false"}>Not friends</MenuItem>
//         </Select>
//     </FormControl>
// </Box>
// <Space wrap>
//     <Button onClick={submit}>Edit</Button>
// </Space>