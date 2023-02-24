/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import styled from 'styled-components';
import { topbarHeight } from '../_shell/Navbar';
import { contentSelectionHeight } from '../_shell/TabContentSelection';
import React from 'react';

export const ContentWithAllAvailableSpace = styled.div<any>`
  position: fixed;
  top: ${`${topbarHeight + contentSelectionHeight}px`};
  left: 0;
  height: calc(100vh - ${`${topbarHeight + contentSelectionHeight}px`});
`;
