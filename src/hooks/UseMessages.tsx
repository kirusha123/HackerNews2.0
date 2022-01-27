import React, { useCallback, useState } from 'react';
import { Toast } from 'react-bootstrap';

const UseMessage = () => {
  const [show, setShow] = useState(false);

  return useCallback(
    (text) => {
      if (text) {
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{text}</Toast.Body>
        </Toast>;
      }
    },
    [show],
  );
};

export default UseMessage;
