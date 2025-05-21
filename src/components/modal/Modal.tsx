import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #1d1c1c;
  color: #ffffff;
  width: 400px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 24px;
  padding-top: 48px;
  position: relative;
  animation: ${fadeIn} 0.2s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #8d8d8d;

  &:hover {
    color: #ffffff;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
`;

const ModalBody = styled.div`
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  background-color: #00ad0e;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #ff0000;
  color: white;
`;

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <Overlay>
      <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <CloseButton aria-label="Close modal" onClick={onCancel}>
            x
        </CloseButton>
        <ModalTitle id="modal-title">{title}</ModalTitle>
        <ModalBody>{children}</ModalBody>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmLabel}</ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
