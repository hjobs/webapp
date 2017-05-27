import React from 'react';

const FileInput = ({
  accept = "image/*",
  multiple = false,
  style = null,
  handleChange
}) => (
  <input
    type="file"
    accept={accept}
    multiple={multiple}
    onChange={evt => {
      evt.persist();
      const file = evt.target.files[0];
      handleChange(file);
    }}
    style={style}
  />
);

export default FileInput;