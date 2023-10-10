import React from 'react';
import './RadioButton.scss';

const RadioButton: React.FC<IRadioButton> = ({id, name, value, onChange, checked, label}) => {
    return (
      <label htmlFor={id} className="radio-label" style={{color: checked ? '#000AFF' : ''}}>
        <input
          className="radio-input"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span className="custom-radio" />
        {label}
      </label>
    )
  }

export default RadioButton;
