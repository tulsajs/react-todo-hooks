import styled from '@emotion/styled/macro';

export default styled.div`
  position: relative;
  margin: 0 auto;
  width: 50%;
  padding: 16px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  background-color: #ffffff;
  border-top: 1px solid #ededed;
  display: flex;
  justify-content: center;
  ul {
    li {
    }
  }
`;

export const FooterList = styled.ul``;

export const FooterListItem = styled.li`
  display: inline-block;
  margin: 0 3px;
`;

export const FooterButton = styled.button`
  border: 1px solid #ededed;
  border-radius: 2px;
  padding: 4px;
  ${props =>
    props.active &&
    `
    border: 1px solid #2779BD;
  `}
`;
