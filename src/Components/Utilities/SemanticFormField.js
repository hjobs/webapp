import React from 'react';
import { Form } from 'semantic-ui-react';

const SemanticFormField = ({control, type, label, placeholder, handleChange, value}) => {
  return (
    <Form.Field
      inline
      control={control || "input"}
      placeholder={placeholder || null}
      type={type || "string"}
      label={label || ""}
      onChange={(event) => { event.preventDefault(); console.log(event.target.value); handleChange(event.target.value); }}
      value={value || ""}
    />
  );
}

export default SemanticFormField;