import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CommonModal = ({title, children}) => {

  return (
    <>


          {children}

    </>
  );
}

export default CommonModal;