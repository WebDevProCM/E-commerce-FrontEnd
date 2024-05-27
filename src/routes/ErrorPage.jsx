import React from 'react'
import classes from './css/errorPage.module.css'
import { Link, useRouteError } from 'react-router-dom'

function ErrorPage() {
    const routeError = useRouteError();
  return (
    <div className={classes.errorPage}>
        <h1 className={classes.title}>Oops!</h1>
        <h4 className={classes.message}>{routeError.message}</h4>
        <Link to={'/'} className="btn btn-primary">GO TO HOMEPAGE</Link>
    </div>
  )
}

export default ErrorPage