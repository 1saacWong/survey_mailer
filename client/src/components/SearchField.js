import React from 'react';

export default ({
  input,
  val,
  type,
  placeholder,
  meta: { error, touched }
}) => {
  const { value, ...inputProps } = input;

  return (
    <div>
      <input
        {...inputProps}
        type={type}
        value={val}
        placeholder={placeholder}
      />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
