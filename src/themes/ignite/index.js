import colors from './colors';
import fonts from './fonts';
import typography from './typography';

export default {
  useColorSchemeMediaQuery: false,
  useLocalStorage: false,
  initialColorModeName: 'default',
  space: [0, 4, 8, 10, 16, 32, 64, 128, 256, 512],
  fonts,
  fontSizes: [12, 14, 16, 20, 24, 30, 48, 64],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 500,
  },
  raddi: [0, 4, 8, 16],
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  // config: {
  // },
  colors,
  input: {
    bg: 'secondary',
    border: 'none',
    '&:hover,&:active,&:focus-visible': {
      outlineColor: 'primary',
    },
  },
  images: {
    card: {
      borderRadius: 8,
      objectFit: 'fill',
      height: '162px',
      width: '100%',
      boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
    },
  },
  text: {
    ...typography,
  },
  layout: {
    pageContent: {
      maxWidth: '786px',
      p: 2,
      m: 'auto',
    },
  },
  styles: {
    ...typography,
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    layout: {
      pageContent: {
        maxWidth: '786px',
        p: 2,
        m: 'auto',
      },
    },
    // body: {
    //   fontSize: 2,
    // },
    button: {
      fontSize: 0,
    },

    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'start',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'start',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
};
