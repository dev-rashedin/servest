import type { PrismTheme } from 'prism-react-renderer';

const MyTheme: PrismTheme = {
  plain: {
    color: '#e6e6e6', // neutral foreground text
    backgroundColor: '#052529', // dark background
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#6a9955', // soft green
        fontStyle: 'italic',
      },
    },
    {
      types: ['keyword'],
      style: {
        color: '#c792ea', // purple accent
        fontWeight: 'bold',
      },
    },
    {
      types: ['string'],
      style: {
        color: '#e5c07b', // warm light yellow
      },
    },
    {
      types: ['number'],
      style: {
        color: '#f78c6c', // orange for contrast
      },
    },
    {
      types: ['function'],
      style: {
        color: '#98c379', // green for functions
        fontWeight: 'bold',
      },
    },
    {
      types: ['type'],
      style: {
        color: '#b5cea8', // pale green type hints
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#ffcb8b', // light yellow for classes
        fontWeight: 'bold',
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#dcdcdc', // default text
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#56b6c2', // cyan
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#dcdcdc',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: '#e5c07b', // keep these in the yellow range
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#a3be8c', // soft green
      },
    },
    {
      types: ['tag'],
      style: {
        color: '#d19a66', // amber-like for HTML tags
      },
    },
  ],
};

export default MyTheme;
