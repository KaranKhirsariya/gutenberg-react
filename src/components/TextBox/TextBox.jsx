/* eslint-disable react/prop-types */
import { ReactComponent as InputClearIcon } from 'assets/images/Cancel.svg';
import clsx from 'clsx';
import { default as t } from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flex } from 'rebass';
import { Input } from 'theme-ui';
import InputIcon from './InputIcon';
const TextBox = React.forwardRef(
  ({
    label,
    labelEnd,
    // type,
    htmlType,
    iconStart,
    iconEnd,
    iconClickable,
    onIconClick,
    initialValue,
    onChange,
    readOnly,
    value,
    onClearClick,
    clearable,
    className,
    onBlur,
    onFocus,
    autoComplete,
    placeholder,
    // children,
    disabled,
    ...props
  }) => {
    const [selfValue, setSelfValue] = useState(initialValue);
    const inputRef = useRef(null);
    // const theme = useThemeUI();
    const [hover, setHover] = useState(false);
    const isControlledComponent = useMemo(() => value !== undefined, [value]);
    const labelClasses = useMemo(
      () => (labelEnd ? 'right-label' : label ? 'left-label' : ''),
      [label, labelEnd]
    );
    const iconClasses = useMemo(
      () => (iconEnd ? 'right-icon' : iconStart ? 'left-icon' : ''),
      [iconStart, iconEnd]
    );

    const simulateChangeEvent = (el, event) => {
      return {
        ...event,
        target: el,
        currentTarget: el,
      };
    };
    const changeHandler = (event) => {
      if (disabled || readOnly) return;
      setSelfValue(event.target.value);
      onChange && onChange(event);
    };
    const clearHandler = (event) => {
      setSelfValue('');
      onClearClick && onClearClick(event);
      /* istanbul ignore next */
      if (!inputRef.current) return;

      const changeEvent = simulateChangeEvent(inputRef.current, event);
      changeEvent.target.value = '';
      onChange && onChange(changeEvent);
      inputRef.current.focus();
    };
    // const { color, borderColor, hoverBorder } = useMemo(
    //   () => getColors(theme.palette, type),
    //   [theme.palette, type]
    // );
    const focusHandler = (e) => {
      setHover(true);
      onFocus && onFocus(e);
    };
    const blurHandler = (e) => {
      setHover(false);
      onBlur && onBlur(e);
    };

    const iconClickHandler = (e) => {
      if (disabled) return;
      onIconClick && onIconClick(e);
    };
    const iconProps = useMemo(
      () => ({
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [iconClickable, iconClickHandler]
    );

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value);
      }
    });

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue };
    const inputProps = {
      ...props,
      ...controlledValue,
    };

    return (
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        className={clsx('input-wrapper', { hover, disabled }, labelClasses, className)}>
        {iconStart && <InputIcon icon={iconStart} {...iconProps} />}
        <Input
          type={htmlType}
          ref={inputRef}
          className={clsx({ disabled }, iconClasses)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          autoComplete={autoComplete}
          {...inputProps}
          sx={{
            bg: 'transparent',
            outline: 'none',
          }}></Input>
        {clearable && selfValue && (
          <InputClearIcon
            visible={Boolean(inputRef.current && inputRef.current.value !== '')}
            disabled={disabled || readOnly}
            onClick={clearHandler}
          />
        )}
        {iconEnd && <InputIcon icon={iconEnd} {...iconProps} />}
        {iconEnd ? iconEnd : null}
      </Flex>
    );
  }
);
TextBox.propTypes = {
  initialValue: t.string,
  label: t.string,
  labelEnd: t.string,
  iconEnd: t.node,
  iconStart: t.node,
  inputProps: t.object,
};

TextBox.defaultProps = {
  value: undefined,
  labelEnd: undefined,
  label: undefined,
  iconEnd: null,
  iconStart: null,
  inputProps: null,
};
TextBox.displayName = 'TextBox';
export default TextBox;
