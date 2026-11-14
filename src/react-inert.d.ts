import 'react';

// React 18's types predate the `inert` attribute; the DOM attribute itself passes through fine.
declare module 'react' {
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}
