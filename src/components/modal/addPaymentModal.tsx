import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: auto; // Ensures modal content can scroll if needed
`;

const ModalBox = styled.div`
  width: 50%;
  max-width: 600px;
  background: #222;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: ${props => props.color || 'gray'};
  &:hover {
    opacity: 0.9;
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState<string>('');
  const [money, setMoney] = useState<string>('');

  // Effect for toggling the body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // Cleanup function to set overflow to visible when the component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <h2>Enter Details</h2>
        <Label>
          Date:
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </Label>
        <Label>
          Amount ($):
          <Input type="number" value={money} onChange={e => setMoney(e.target.value)} />
        </Label>
        <ButtonGroup>
          <Button color="#ff4d4d" onClick={() => onClose()}>Cancel</Button>
          <Button color="#4CAF50" onClick={() => console.log({ date, money })}>Confirm</Button>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
};

export default ModalComponent;