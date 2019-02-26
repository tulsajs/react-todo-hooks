import React from 'react';
import styled from '@emotion/styled/macro';

const Button = styled.button`
  position: relative;
  padding: 4px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  background-color: #2779bd;
  align-items: center;
  border-radius: 2px;
  border: none;
  svg {
    path {
      fill: #eff8ff;
    }
  }
  &:focus,
  &:active {
    background-color: #eff8ff;
    svg {
      path {
        fill: #2779bd;
      }
    }
  }
`;

export default ({ type, ...props }) => {
  return (
    <Button {...props}>
      {type === 'edit' ? (
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z" />
        </svg>
      )}
    </Button>
  );
};
