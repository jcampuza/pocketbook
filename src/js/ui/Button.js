import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 2px;
  background-color: #e0e0e0;
  padding: 0 8px;
  height: 24px;
  min-width: 60px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: block;

  > ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;
