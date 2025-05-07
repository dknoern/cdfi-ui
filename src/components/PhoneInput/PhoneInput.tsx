import React, { FC } from 'react';
import ReactPhoneInput, {
  PhoneInputProps as ReactPhoneInputProps,
} from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import styles from './PhoneInput.module.scss';

type PhoneInputProps = {
  value?: ReactPhoneInputProps['value'];
  onChange?: ReactPhoneInputProps['onChange'];
  placeholder?: ReactPhoneInputProps['placeholder'];
};

export const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <ReactPhoneInput
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    country="us"
    containerClass={styles.container}
    buttonClass={styles.button}
  />
);
