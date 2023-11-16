import { Outlet, Navigate } from "react-router-dom";

function ProtectedParentRoute({isUser}) {
    return ( 
        isUser ? <Outlet/> : <Navigate to={"/Login"}/>
     );
}

export default ProtectedParentRoute;