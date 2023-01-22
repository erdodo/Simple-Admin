import { ElNotification } from "element-plus";
const error = (message, title = "Hata") => {
  ElNotification({
    title: title,
    message: message,
    type: "error",
    position: "bottom-left",
  });
};
const warning = (message, title = "Dikkat") => {
  ElNotification({
    title: title,
    message: message,
    type: "warning",
    position: "bottom-left",
  });
};

const success = (message, title = "Başarılı") => {
  ElNotification({
    title: title,
    message: message,
    type: "success",
    position: "bottom-left",
  });
};
export default { error, warning, success };
