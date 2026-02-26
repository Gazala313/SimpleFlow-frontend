import { PublicClientApplication } from "@azure/msal-browser";

export const clientId = import.meta.env.VITE_CLIENT_ID;
export const authority = import.meta.env.VITE_AUTHORITY;
export const scope = import.meta.env.VITE_SCOPE || null;
export const redirectUri = `${window.location.origin}/auth/callback`;

export const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage", // or sessionStorage
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
