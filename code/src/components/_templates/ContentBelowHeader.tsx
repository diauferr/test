import styled from 'styled-components';
import { contentSelectionHeight } from '../_shell/TabContentSelection';
import { topbarHeight } from '../_shell/Navbar';

export const ContentBelowHeader = styled.main<any>`
  position: relative;
  margin-top: ${`${topbarHeight + contentSelectionHeight}px`};
`;
