declare module '@testing-library/react' {
  export function render(ui: any, options?: any): any;
  export const screen: any;
  export function cleanup(): void;
  export function within(element: any): any;
}

declare module '@testing-library/user-event' {
  export function setup(): any;
  const userEvent: { setup: () => any };
  export default userEvent;
}

declare module '@testing-library/jest-dom' {
  // jest-dom augments expect; leave empty to satisfy imports
}
