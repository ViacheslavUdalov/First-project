let store = {
     _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hello', likesCount: 12},
                {id: 2, message: 'ok. let.s go', likesCount: 128}
            ],
            newPostText: 'stormgate top!'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Maru'},
                {id: 2, name: 'Serral'},
                {id: 3, name: 'TYTY'},
                {id: 4, name: 'Innovation'},
                {id: 5, name: 'sOs'},
                {id: 6, name: 'Stats'}
            ],
            messages: [
                {id: 1, message: 'diedie'},
                {id: 2, message: 'hihi'},
                {id: 3, message: 'wowow'},
                {id: 4, message: 'isi two'},
                {id: 5, message: 'ready to go'},
                {id: 6, message: 'my assimilator'}
            ]
        }
    },
    _callSubscriber () {
        console.log('stormgate fac sc2!');
    },
    getState() {
         return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
if (action.type === 'ADD-POST') {
    let newPost = {
        id: 5,
        message:this._state.profilePage.newPostText,
        likesCount: 0
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
}
else if (action.type === 'UPDATE-NEW-POST-TEXT') {
    this._state.profilePage.newPostText = action.newText;
    this._callSubscriber(this._state);
}
    }
}
export default store;