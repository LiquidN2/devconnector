import React from 'react';

export const ControlledEmailInput = props => {
  return (
    <input
      type="email"
      name="email"
      className="form__input"
      placeholder="email"
      value={props.email}
      onChange={props.onChange}
      required
    />
  );
};

export const ControlledPasswordInput = props => {
  return (
    <input
      type="password"
      name="password"
      className="form__input"
      placeholder="password"
      value={props.password}
      onChange={props.onChange}
      required
    />
  );
};

export const ControlledPassword2Input = props => {
  return (
    <input
      type="password"
      name="password2"
      className="form__input"
      placeholder="password"
      value={props.password2}
      onChange={props.onChange}
      required
    />
  );
};

export const ControlledTextInput = props => {
  return (
    <input
      type="text"
      name={props.fieldName}
      id={props.fieldId}
      className={props.className || "form__input"}
      placeholder={props.placeholder || ''}
      value={props.fieldValue}
      onChange={props.onChange}
      required={props.required}
      disabled={props.isDisabled}
      autoFocus={props.autoFocus}
    />
  );
};


export const ControlledTextArea = props => {
  const resize = {
    resize: props.resize
  };

  return (
    <textarea
      rows={props.rows}
      style={resize}
      name={props.fieldName}
      id={props.fieldId}
      value={props.fieldValue}
      className={props.className || "form__input"}
      placeholder={props.placeholder || ''}
      onChange={props.onChange}
      required={props.required}
      disabled={props.isDisabled}
    />
  );
}


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const ControlledMonthDropDown = props => {
  return (
    <select
      name={props.fieldName}
      id={props.fieldId}
      value={props.fieldValue}
      className={props.className || "form__input"}
      onChange={props.onChange}
      required={props.required}
      disabled={props.isDisabled}
    >
      <option value="">- select month -</option>
      {
        months.map((month, index) => {
          return (
            <option
              key={index}
              value={month}
            >
              {month}
            </option>
          );
        })
      }
    </select>
  );
};

const years = [];
for (let i = (new Date()).getFullYear(); i >= 1900; i--) {
  years.push(i);
}
export const ControlledYearDropDown = props => {
  return (
    <select
      name={props.fieldName}
      id={props.fieldId}
      value={props.fieldValue}
      className={props.className || "form__input"}
      onChange={props.onChange}
      required={props.required}
      disabled={props.isDisabled}
    >
      <option value="">- select year -</option>
      {
        years.map((year, index) => {
          return (
            <option
              key={index}
              value={year}
            >
              {year}
            </option>
          );
        })
      }
    </select>
  );
};

export const ControlledDropDownMenu = props => {
  return (
    <select
      name={props.fieldName}
      id={props.fieldId}
      value={props.fieldValue}
      className={props.className || "form__input"}
      onChange={props.onChange}
      required={props.required}
      disabled={props.isDisabled}
    >
      <option value="">- select -</option>
      {
        props.options.map((option, index) => {
          return (
            <option
              key={index}
              value={option}
            >
              {option}
            </option>
          );
        })
      }
    </select>
  );
};