import { styled } from "styled-components";

export const CryptoTableElement = styled.table`
  margin: 2rem auto;
  background-color: #00000069;
  font-size: 1.5em;
  color: white;
  border: 1px solid white;
  padding: 26px;
  text-align: start;
  th {
    text-align: start;
  }
  input {
    height: 27px;
  }
`;

export const Totalnetworth = styled.h2`
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  color: #11df11;
  font-size: 2rem;
`;

export const TableTextInput = styled.input`
  border: 1px solid white;
  color: white;
  background-color: transparent;
`

export const TableNumberInput = styled.input`
  border: 1px solid white;
  color: white;
  background-color: transparent;
`
export const CreateCryptoBtn = styled.button`
  height: 27px;
  border: 1px solid white;
  width: 100%;
  color: lime;
  background-color: transparent;
  cursor: pointer;
`

export const TableErrorHeader = styled.h2`
  color: red;
  border: 1px dotted red;
  text-align: center;
`