import axios from "axios";
import bildir from "@/components/bildir";
import store from "@/store";

const token = localStorage.getItem("token", "4ed81a1bca39b6106b62d98d9a93c13b");
const base_url = "https://backend.erdoganyesil.com.tr/";

const login = async (email, pass) => {
  var data = JSON.stringify({
    email: email,
    password: pass,
  });
  var config = {
    url: base_url + "api/account/login",
    headers: {
      token: token,
    },
  };
  let datas;
  await axios
    .post(config.url, data, config)
    .then((res) => {
      if (res.data.data?.token != undefined) {
        localStorage.setItem("token", res.data.data?.token);
        store.commit("set_logged_in", true);
        store.commit("set_TOKEN", res.data.data?.token);
        location.reload();
      }
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.response.data.message);
    });
  return datas;
};
const logout = () => {
  var config = {
    url: base_url + "api/account/logout",
    headers: {
      token: token,
    },
  };

  axios
    .post(config.url, {}, config)
    .then(() => {
      localStorage.clear();
      store.commit("set_logged_in", false);
      localStorage.setItem("logged_in", false);
      store.commit("set_TOKEN", null);
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.response.data.message);
    });
};
export default { login, logout };
