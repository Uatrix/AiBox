/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.Vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
