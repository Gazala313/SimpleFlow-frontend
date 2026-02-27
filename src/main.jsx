import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { msalInstance } from "./authConfig";

async function bootstrap() {
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();

  if (response) {
    msalInstance.setActiveAccount(response.account);
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>
);
}

bootstrap();
