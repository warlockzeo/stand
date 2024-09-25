/* eslint-disable eqeqeq */
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
    <Wrap type={type}>
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{label}</span>
      {type == 'multitext' ? (
        <textarea
          defaultValue={value}
          className='form-control'
          {...register}
          id={nameId}
          placeholder={placeholder}
          onChange={onChangeField}
          onFocus={onChangeField}
          style={{}}
        />
      ) : (
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
      )}
    </Wrap>
  );
};

export default Field;
