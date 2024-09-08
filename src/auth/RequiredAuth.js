/**
 * @file RequiredAuth.js
 * @brief RequiredAuth Module
 *
 * This module exports a function that renders either the Outlet or the connexion page based on user role from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import ROUTES from "routes/routes"

/**
 * @brief RequiredAuth Page Component
 * @param allowedRoles - The allowed roles.
 * @param location - The location.
 */
const RequireAuth = ({ allowedRoles,location }) => {
  const user = useSelector((state)=>state.authentificationReducer.user)

  const isPasswordResetPage = location?.pathname === ROUTES.resetPassword;

  if(user?.roles?.find(role=> allowedRoles?.includes(role))){
    return <Outlet />;
  }

  //const destination = user ? "/" : ROUTES.connexion;
  const destination = user ? "/" : isPasswordResetPage ? location.pathname : ROUTES.connexion;
  return <Navigate to={destination} state={{from : location}} replace />

};

export default RequireAuth;
