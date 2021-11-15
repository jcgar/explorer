import { css } from 'styled-components';

export const theme = {
  primary: '#FF0049',
  secondary: '#002B45',
  line: '#009dff',
  error: '#E74C3C',
  white: '#FFFFFF',
  black: '#000000',
  focus: '#E67E22',
  gray: {
    p50: '#fafafa',
    p100: '#f5f5f5',
    p200: '#eee',
    p300: '#e0e0e0',
    p400: '#bdbdbd',
    p500: '#9e9e9e',
    p600: '#757575',
    p700: '#616161',
    p800: '#424242',
    p900: '#212121'
  },
  sizes: {
    s: px2rem(12),
    m: px2rem(14),
    l: px2rem(16),
    xl: px2rem(20),
    xxl: px2rem(24)
  },
  weight: {
    s: 200,
    m: 400,
    l: 600,
  },
  padding: i => px2rem(i * 16)
};

export const commonCss = {
  iconLeftRight: css`
    & svg:first-child {
      margin-right: 0.5rem;
    }
    & svg:last-child {
      margin-left: 0.5rem;
    }
  `,
  centerFlex: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
};

export const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    console.error(input, "input is not a valid hex color.");
    return '0,0,0'
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

export const lighten = (hex, percent = 100) => {
  return `rgba(${hexToRgb(hex)}, ${percent / 100})`;
};

export function px2rem (px) { return Number(px) ? `${Number(px) / 16}rem` : 0; };