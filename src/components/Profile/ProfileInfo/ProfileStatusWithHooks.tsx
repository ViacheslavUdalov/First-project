import React, {ChangeEvent, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useAppDispatch} from "../../../redux/redux-store";
import {updateStatus} from "../../../redux/profile-reducer";
import styles from './ProfileInfo.module.css';

interface Props {
    status: string
    isOwner: boolean
}

const ProfileStatusWithHooks = (props: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true)
        }

    }
    const deActivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    };
    return (
        <div className={styles.statusSize}>
            {!editMode &&
                <div className={styles.status}>
                    <span onClick={activateEditMode}>{props.status || 'My status is empty!'}</span>
                </div>}

            {editMode &&
                <div>
                    <Box
                        className = {styles.statusInput}
                        component="form"
                        sx={{
                            '& > :not(style)': {
                                m: 1, width: '32ch',
                                backgroundColor: 'white',
                                borderRadius: '30px 30px 5px 5px'
                            },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField id="filled-basic" label="My Status" variant="filled"
                                   onChange={onStatusChange} autoFocus={true}
                                   onBlur={deActivateEditMode}
                                   value={status}/>

                    </Box>
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;