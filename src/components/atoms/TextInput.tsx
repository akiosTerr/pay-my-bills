import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text shown above the input */
  label?: string;
  /** Error message shown under the input & turns border red */
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0px;
`;

export const Label = styled.label`
  color: #ececec;           /* gray-800 */
  font-weight: 500;
  font-size: 1rem;      /* text-sm */
  margin-bottom: 0.7rem;   /* mb-1 */
`;

const Input = styled.input<{ $hasError: boolean }>`
  padding: 0.75rem 1rem;    /* py-3 px-4 */
  font-size: 1rem;          /* text-base */
  border: 2px solid
    ${({ $hasError }) => ($hasError ? '#ef4444' : '#d1d5db')}; /* red-500 / gray-300 */
  border-radius: 0.5rem;    /* rounded-lg */
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#3b82f6')}; /* blue-500 */
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)'};
  }

  &:disabled {
    background: #f9fafb;    /* gray-50 */
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Error = styled.span`
  color: #ef4444;           /* red-500 */
  font-size: 0.75rem;       /* text-xs */
  margin-top: 0.25rem;
`;

/**
 * Reusable text input with label & error state.
 *
 * ```tsx
 * <TextInput label="Email" placeholder="you@example.com" />
 * ```
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    // Autogenerate id if not provided (keeps label ↔ input association)
    const inputId =
      id ?? `text-input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <Wrapper>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          $hasError={!!error}
          {...rest}
        />
        {error && <Error>{error}</Error>}
      </Wrapper>
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
