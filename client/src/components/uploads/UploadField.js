import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
  const { value, ...inputProps } = input;

  const handleChange = e => {
    if (input.type === 'file') {
      input.onChange(e.target.files[0]);
    }
  };
  return (
    <div>
      <label>{label}</label>
      <input
        {...inputProps}
        type={type}
        onChange={handleChange}
        style={{ marginBottom: '5px' }}
      />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
