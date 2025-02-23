import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
    const paymentInProgress = sessionStorage.getItem("paymentInProgress");
    return paymentInProgress ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes