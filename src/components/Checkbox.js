import React from 'react';
import styled from '@emotion/styled/macro';

const CheckboxContainer = styled.span`
  width: 16px;
  height: 16px;
  border 1px solid #2779BD;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    path {
      fill: #2779BD;
    }
  }
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:focus {
    + div {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid rgb(77, 144, 254);
    }
  }
`;

export default function Checkbox({ checked, ...props }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox {...props} />
      <div />
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      )}
    </CheckboxContainer>
  );
}
