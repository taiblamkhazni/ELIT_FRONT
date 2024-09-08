/**
 * @file Snackbar.js
 * @brief Snackbar Utility Module
 *
 * Utilizes 'react-toastify' for displaying toast notifications in the application.
 * This module is responsible for configuring and presenting toast messages to the user
 * in a consistent and user-friendly manner. It supports different types of notifications
 * like 'success' and 'error'.
 */
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * @brief Displays a toast notification.
 * @param type - Type of the toast notification. It can be 'success' or 'error'.
 * @param message - The message to be displayed in the toast notification.
 *
 * This function presents a toast notification on the screen. It takes two parameters,
 * 'type' and 'message', to determine the notification's style and content.
 *
 */
export function Snackbar(type, message) {
  const options = {
    position: "bottom-center"
  };
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
  }
}
