import styled from 'styled-components'
// lib
import * as styles from '../../lib/styles/styles'

const ViewerWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  ${styles.scrollbar(0)};
`;

export default ViewerWrapper