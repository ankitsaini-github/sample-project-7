import React from 'react'
import classes from './Loader.module.css'
function Loader() {
  return (<>
    <div className={classes.ring}><div></div><div></div><div></div><div></div></div>
    <p>Please Wait...</p>
  </>)
}

export default Loader