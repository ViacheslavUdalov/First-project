import {Suspense} from "react";

const AppSuspense  = (Component) => (props) =>{
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props}/>
            </Suspense>
        </div>
    );
}
export default AppSuspense;