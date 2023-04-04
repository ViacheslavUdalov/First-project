import styles from './ChatPage.module.css'
import chatIcon from '../../common/images/chat_FILL0_wght500_GRAD0_opsz48.png'
const ChatPageTopPage = () => {
    return <div className={styles.page}>
        <img className={styles.ChatMenuIcon} src={chatIcon}/>
        <span className={styles.CommonChat}>
Общий чат
            </span>
    </div>
}
export default ChatPageTopPage