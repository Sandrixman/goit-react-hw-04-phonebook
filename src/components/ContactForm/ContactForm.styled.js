import styled from '@emotion/styled';
import { Form } from 'formik';

export const FormStyled = styled(Form)`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 300px;
  padding: 20px;
`;

export const ErrorText = styled.p`
  color: red;
`;

export const Label = styled.label`
  :nth-of-type(2) {
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
`;
