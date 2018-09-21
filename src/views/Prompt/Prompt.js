import React from 'react';

// Components
import Modal from 'components/Modal';
import Form from './components/Form';

const Prompt = () => (
  <Modal id="prompt">
    {props => <Form {...props} />}
  </Modal>
);

export default Prompt;
