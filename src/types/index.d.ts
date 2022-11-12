export {};

declare global {
  interface Window {
    tronWeb: any;
    martian: any;
    aptos: any; // 👈️ turn off type checking
  }
}
