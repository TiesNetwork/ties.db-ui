import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';

/** Components **/
import Button from 'components/Button';
import Form, { Actions, Input } from 'components/Form';

/** Types **/
import {
  QUERY_FORM_ID,
} from '../ducks';

/** Utils **/
import validate, { required } from 'utils/validate';

const SettingsQueryForm = ({
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Input label="WebSocket server URL" name="ws" />

    <Actions>
      <Button type="submit">
        Save
      </Button>
    </Actions>
  </Form>
);

const mapStateToProps = ({ services }) => ({
  initialValues: {
    ws: get(services, 'env.ws')
  },
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: QUERY_FORM_ID,
    validate: validate({
      ws: [required()],
    }),
  }),
)(SettingsQueryForm);