import React, { forwardRef } from 'react'
import classes from "./Modal.module.css";

const Modal = forwardRef(({children}, ref)=> {
  return (
      <dialog ref={ref}>
          {children}
      </dialog>

  )
})

export default Modal