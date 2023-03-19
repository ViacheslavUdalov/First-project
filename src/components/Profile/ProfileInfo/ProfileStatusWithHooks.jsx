import React, {useEffect, useState} from "react";
const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
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
                        <input onChange={onStatusChange} autoFocus = {true}
                               onBlur={deActivateEditMode}
                               value={status}/>
                    </div>}
            </div>
        )
}
export default ProfileStatusWithHooks;