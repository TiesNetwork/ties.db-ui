import React from 'react';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Textarea } from 'components/Form';

/** Types **/
import {
  QUERY_FORM_ID,
} from '../ducks';

/** Utils **/
import validate, { required } from 'utils/validate';

const QueryForm = ({
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Textarea label="TiQL" name="query" />

    <Actions>
      <Button type="submit">
        Send
      </Button>
    </Actions>
  </Form>
);

export default compose(
  reduxForm({
    form: QUERY_FORM_ID,
    validate: validate({
      query: [required()],
    }),
  }),
)(QueryForm);
