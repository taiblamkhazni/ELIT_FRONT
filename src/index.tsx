/**
 * @file index.tsx
 * @brief This module exports the app index file.
 */
import { AuthProvider } from "context/AuthProvider";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import {
  BrowserRouter,
} from "react-router-dom";
import store from "store/store";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

/**
 * @var root
 * @brief Inject the code dans le DOM.
 */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <React.StrictMode> */}
      {/* <HistoryRouter history={history}> */}
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>

      {/* </HistoryRouter> */}
      {/* </React.StrictMode> */}
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
