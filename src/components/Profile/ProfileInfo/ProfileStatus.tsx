import React, {ChangeEvent} from "react";
type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    isEdited: boolean
    status: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        isEdited: false,
        status: this.props.status
    }
    activateEditMode = () => {
    this.setState({
        isEdited: true
    })
    }
    deactivateEditMode() {
        this.setState({
            isEdited: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.isEdited &&
                    <div>
                <span onClick={this.activateEditMode}>{this.props.status || 'Enter your status!'}</span>
                        </div>}
                {this.state.isEdited &&
                    <div>
                <input onChange={this.onStatusChange} autoFocus = {true}
                       onBlur={this.deactivateEditMode.bind(this)}
                value={this.state.status}/>
                        </div>}
            </div>
        )
    }
}
export default ProfileStatus;