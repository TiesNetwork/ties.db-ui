import { get } from 'lodash';
import React from 'react';
import ReactAce from 'react-ace';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';

import 'brace/mode/mysql';
import 'brace/theme/xcode';

/** Components **/
import Button from 'components/Button';
import Form, { Actions } from 'components/Form';

/** Types **/
import {
  QUERY_FORM_ID,
} from '../ducks';

/** Utils **/
import validate, { required } from 'utils/validate';

import styles from './Form.scss';

const QueryFormAce = ({ input }) => (
  <div className={styles.Field}>
    <ReactAce
      className={styles.Textarea}
      fontSize={14}
      highlightActiveLine={false}
      mode="mysql"
      name={get(input, 'name')}
      onChange={get(input, 'onChange')}
      theme="xcode"
      showGutter={false}
      showPrintMargin={false}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        tabSize: 2,
      }}
      value={get(input, 'value')}
    />
  </div>
);

const QueryForm = ({
  handleSubmit,
  reset,
}) => (
  <Form
    className={styles.Root}
    onSubmit={handleSubmit}
  >
    <Field component={QueryFormAce} name="query" />


    <Actions className={styles.Actions}>
      <Button onClick={reset} variant={Button.VARIANT.SECONDARY}>
        Reset
      </Button>

      <Button type="submit">
        Run current
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
