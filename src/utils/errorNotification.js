import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const errorNotification = (msg, time) => {
  toast.error(msg, {
    autoClose: time || 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
