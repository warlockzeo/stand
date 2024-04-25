import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrap } from './styles';

const Field = ({
  type,
  value,
  label,
  icon,
  nameId,
  placeholder,
  onChangeField,
  register,
}) => {
  return (
    <Wrap>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{label}</span>
      <input
        defaultValue={value}
        className='form-control'
        type={type}
        {...register}
        id={nameId}
        placeholder={placeholder}
        onChange={onChangeField}
        onFocus={onChangeField}
      />
    </Wrap>
  );
};

export default Field;
