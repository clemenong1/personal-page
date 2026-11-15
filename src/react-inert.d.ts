import 'react';

// React 18's types predate the `inert` attribute; the DOM attribute itself passes through fine.
declare module 'react' {
  // The type parameter must match React's own declaration for the merge to apply.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}
