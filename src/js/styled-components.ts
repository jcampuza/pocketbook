import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { AppTheme } from './lib/themes';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<AppTheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };
export default styled;
