import { createGlobalStyle } from 'styled-components';

import Arcade from './ARCADE.woff';
import Arcade2 from './ARCADE.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Arcade';
        src: local('Arcade'), local('Arcade'),
        url(${Arcade}) format('woff2'),
        url(${Arcade2}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;
