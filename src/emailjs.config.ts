// This config supports both Vite (browser) and Jest/node (test) environments
let SERVICE_ID: string = "";
let TEMPLATE_ID: string = "";
let PUBLIC_KEY: string = "";

// Use Vite env vars in browser/dev/prod, and process.env in test (Node)
if (
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_EMAILJS_SERVICE_ID
) {
  SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
} else if (typeof process !== "undefined" && process.env) {
  SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID || "";
  TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID || "";
  PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY || "";
}

export { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY };
