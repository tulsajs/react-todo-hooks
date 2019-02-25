import styled from '@emotion/styled/macro';

export default styled.input`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 50%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  padding: 16px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: rgba(175, 47, 47, 0.15);
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: rgba(175, 47, 47, 0.15);
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: rgba(175, 47, 47, 0.15);
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: rgba(175, 47, 47, 0.15);
  }
`;
