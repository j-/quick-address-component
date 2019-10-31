export const useWindowListener = <K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any) => {
  window.addEventListener(type, listener);
  return () => window.removeEventListener(type, listener);
};
