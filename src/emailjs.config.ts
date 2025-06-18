// This config supports both Vite (browser) and Jest/node (test) environments
let SERVICE_ID: string = '';
let TEMPLATE_ID: string = '';
let PUBLIC_KEY: string = '';

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID || '';
  TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID || '';
  PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY || '';
} else {
  // @ts-expect-error: Vite injects import.meta.env at build time
  SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  // @ts-expect-error: Vite injects import.meta.env at build time
  TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  // @ts-expect-error: Vite injects import.meta.env at build time
  PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
}

export { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY };
