import React, { forwardRef } from 'react'
import "./Modal.css";

const Modal = forwardRef(({children}, ref)=> {
  return (
      <dialog ref={ref}>
          {children}
      </dialog>

  )
})

export default Modal