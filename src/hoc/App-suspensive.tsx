import {Suspense} from "react";
type Props = {}
const AppSuspense  = (Component: any) => (props: Props) =>{
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props}/>
            </Suspense>
        </div>
    );
}
export default AppSuspense;