import React from 'react';
import styled from 'styled-components';

// Styled number input with decimal support
const StyledNumberInput = styled.input.attrs({
  inputMode: 'numeric',
  pattern: '[0-9]*[.,]?[0-9]*',
})`
  width: 100%;
  max-width: 200px;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

// Props for the NumberInput component
interface NumberInputProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  // Allow any decimal step or specific number
  step?: number | 'any';
  placeholder?: string;
  disabled?: boolean;
}

// NumberInput component
const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  onChange,
  min,
  max,
  step = 'any',
  placeholder,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const parsed = newValue === '' ? NaN : parseFloat(newValue);
    if (!isNaN(parsed)) {
      onChange(parsed);
    } else {
      onChange(NaN);
    }
  };

  return (
    <StyledNumberInput
      id={id}
      type={'number'}
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default NumberInput;