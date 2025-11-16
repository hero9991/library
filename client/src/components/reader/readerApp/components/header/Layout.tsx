import styled from 'styled-components'
// lib
import palette from '../../lib/styles/palette'
import zIndex from '../../lib/styles/zIndex'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  z-index: ${zIndex.header};
`;

export const AutoLayout = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: right;
  border-bottom: 2px solid ${palette.gray1};

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  & > div:last-child {
    margin-right: 8px;
  }
  & > div > button {
    font-family: 'Noto Sans Armenian', "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 1rem;
    background: transparent;
  }
`;

export default Layout