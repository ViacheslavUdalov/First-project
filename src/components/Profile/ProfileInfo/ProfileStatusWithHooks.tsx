import React, {ChangeEvent, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
interface Props {
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
}
const ProfileStatusWithHooks = (props : Props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
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
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
       setStatus(e.currentTarget.value)
        };
        return (
            <div>
                {!editMode &&
                    <div>
                        <span onClick={activateEditMode}>{props.status || 'My status is empty!'}</span>
                    </div>}

                {editMode &&
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch',
                                    backgroundColor: 'white',
                                borderRadius: '30px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" label="My Status" variant="filled"
                                       onChange={onStatusChange} autoFocus = {true}
                                       onBlur={deActivateEditMode}
                                       value={status}/>

                        </Box>
                    </div>
                }
            </div>
        )
}
export default ProfileStatusWithHooks;