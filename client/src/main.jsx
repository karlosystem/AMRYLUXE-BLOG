import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Asegúrate de que esto sea react-redux
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

// NUEVA IMPORTACIÓN PARA EL SEO
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
        <HelmetProvider>
          <ToastContainer />
          <App />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);