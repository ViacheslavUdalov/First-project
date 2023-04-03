# Описание Проекта
## API document https://social-network.samuraijs.com/docs
Данный проект является небольшой социальной сетью,
в которой можно авторизоваться, писать информацию о себе,
загружать свой собственный аватар, выводить список пользователей, добавлять и удалять их
из друзей. Так же реализована система общего чата, с помощью WebSocket.
____
### Проект реализован с помощью трёх слоёв:
+ User Interface Design
+ Business Logic Layer
+ Application Programming Interface 

*Каждый из слоёв обладает своей собственной ответсвенностью.*
____
# Развёртывание
 Клонирование проекта.
```typescript
npm install
```
в конце описания показаны скрипты для работы сайта.
____
# Стак технологий
+ React, Typescript
+ React-redux
+ Redux-thunk, Hooks, HOC, Reselect
+ React Router
+ Axios
+ react-hook-form
+ Ant Design, Material UI
+ WebSocket
+ Reselect
___
# Application Programming Interface
В этом слое реализован набор компонетов, которые общаются с сервером.

Использование данного слоя реализовано ниже, на примере компонента авторизации API.
```typescript
export type MeResponseType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
        userId: number
}
export const authAPI = {
    me() {
        return instance.get<APIResponse<MeResponseType>>('auth/me').then((res) => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false,
          captcha: null | string = null) {
                return instance.post<APIResponse<LoginResponseDataType,
            ResultCodesEnum | ResultCodeForCaptcha>>('auth/login',
            {email, password, rememberMe, captcha}).then((res) => res.data)
    },
    logout() {
        return instance.delete('auth/login').then(res => res.data)
    }
}
```
___
В качестве ответа с сервера возвращается объект Promise, с данными из 
типа APIResponseType
Из общего слоя API экспортируются общие типы(type)
для релизации resultCode, который приходит ответом с сервера.
Так же некоторые типы являются Дженериками.
```typescript
export type APIResponse<D = {}, RC = ResultCodesEnum | ResultCodeForCaptcha > = {
    data: D
    messages: Array<string>
    resultCode: RC
}
```
___
Создание API происходит с помощью библиотеки axios 
```typescript
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "62cccde2-b4f1-4a7a-a0be-73094ff4a37b"
    }
})
```
withCredentials - определяет, должны ли создаваться кросс-доменные запросы
с помощью cookie.
____
# Business Logic Layer
Реализован с помощью Redux, thunk.
В данном слое хранится свой Store, а так же initialState.
```typescript
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}
type initialType = typeof initialState;
const AuthReducer = (state = initialState, action: ActionsType): initialType => {
    switch (action.type) {
        case SETUSERDATE:
        case GET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
```
Внутри Reducer'a есть объект actions,  в котором лежат ActionCreator'ы
с собственным типом, 
которые потом вызываются как callback'и. 
С помощью типов происходит Switch Case по  объекту actions.
```typescript
export const actions = {
    setUserData: (userId: number | null, email: string | null,
                  login: string | null, isAuth: boolean) =>
        ({type: SETUSERDATE, payload: {userId, email, login, isAuth}} as const),
    setCaptcha: (captchaURL: string | null) =>
        ({type: GET_CAPTCHA, payload: {captchaURL}} as const)
}
```
В Reducer'e реализованы thunk, которые вызываются потом в UI компоненте с 
помощью thunkMiddleWare. Внутри происзодят ассинхроннее операции: dispatch и 
запрос на сервер с помощью импортируемой API компоненты.
```typescript
export const login = (email: string, password: string,
                      rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {

    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserProfile())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }
    }
}
```
____
# User Interface Design
### Реализован с помощью:
+ вызова Thunk'ок хуком useDispatch
```typescript
const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        dispatch(login(data.email, data.password,
            data.rememberMe, data.captcha))
    }
```
+ С помощью хуков useState и useEffect
```typescript
const [isAuthScroll, setAutoScroll] = useState(true)
const messagesRef = useRef<HTMLDivElement>(null)

const onScrollChanged = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    const whatTheScrollIs = element.scrollHeight - element.scrollTop
    const currentValue = Math.abs(whatTheScrollIs - element.clientHeight)
    if (currentValue < 300) {
        if(!isAuthScroll) {
            setAutoScroll(true)
        }
    }
    else {
        if (isAuthScroll) {
            setAutoScroll(false)
        }
    }
}
useEffect(() => {
    if (isAuthScroll) {
        messagesRef.current?.scrollIntoView()
    }
}, [messages])
```
+  HOC

 withAuthRedirect - high order component, который принимает внутрь
себя компонент и возвращает другой компонент на основе авторизационных
данных isAuth, которые приходит из Redux.
```typescript
export const WithAuthRedirect = (Component: any) => {
    type Props = {
        isAuth: boolean
    }
    class RedirectComponent extends React.Component<Props> {

        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'}/>
            return <Component {...this.props}/>
        }
    }
    let authRedirect = connect(mapStateToProps)(RedirectComponent);
    return authRedirect;
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
```
+ Selectors

Реализованы с помощью библиотеки Reselect, используются данные
напрямую из ReduxStore, а не прокидывать данные через всё дерево пропсами.
```typescript
 const users = useAppSelector(getUsersState)
const pageSize = useAppSelector(getPageSize)
const totalCount = useAppSelector(getTotalCount)
const currentPage = useAppSelector(getCurrentPage)
const followingProcess = useAppSelector(getFollowingProcess)
const filter = useAppSelector(getFilter)
const dispatch = useAppDispatch()
const [searchParams, setSearchParams] = useSearchParams()
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
