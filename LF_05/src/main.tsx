import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NProgress from "nprogress";
import "@/locales/langs/i18n";
import 'virtual:svg-icons-register'
import "@/styles/base.css";
import "nprogress/nprogress.css";
import App from "./App";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
NProgress.configure({ easing: "ease", speed: 500 })

window.NProgress = NProgress;