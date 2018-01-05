import React from 'react';

export default ({ input, val, type, meta: { error, touched } }) => {
  const { value, ...inputProps } = input;

  return (
    <div>
      <input {...inputProps} type={type} value={val} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
