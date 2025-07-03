import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "@/styles/base.css";
import "nprogress/nprogress.css";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import store, { persistor } from "./store/store";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);