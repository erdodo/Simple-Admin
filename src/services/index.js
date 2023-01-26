import axios from "axios";
import moment from "moment/moment";
import bildir from "@/components/bildir";
import store from "@/store";

import auths from "./auths";

const token = store.getters.get_token; //localStorage.getItem("token");
const base_url = "https://backend.erdoganyesil.com.tr/";

const list = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    url: base_url + "api/v1/" + table_name + "/list",
    headers: {
      token: token,
    },
  };
  let datas;
  await axios
    .post(config.url, data, config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const show = async (table_name, filter) => {
  var config = {
    method: "post",
    url: base_url + "api/v1/" + table_name + "/show/" + filter,
    headers: {
      token: token,
    },
  };
  let datas;
  await axios(config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const create = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    method: "get",
    url: base_url + "api/v1/" + table_name + "/create",
    headers: {
      token: token,
    },
    data: data,
  };
  let datas;
  await axios(config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const add = async (table_name, params) => {
  const url = base_url + "api/v1/" + table_name + "/add";
  const headers = {
    token: token,
    "Content-Type": "multipart/form-data",
  };
  let datas = { status: "error" };
  await axios
    .post(url, params, { headers })
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.response.data.message);
    });
  return datas;
};
const edit = async (table_name, filter) => {
  var config = {
    method: "get",
    url: base_url + "api/v1/" + table_name + "/edit/" + filter,
    headers: {
      token: token,
    },
  };
  let datas;
  await axios(config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const update = async (table_name, filter, params) => {
  const url = base_url + "api/v1/" + table_name + "/update/" + filter;
  var config = {
    headers: {
      token: token,
    },
  };
  let datas;
  await axios
    .post(url, params, config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const clean = async (table_name, filter) => {
  var config = {
    method: "get",
    url: base_url + "api/v1/" + table_name + "/delete/" + filter,
    headers: {
      token: token,
    },
  };
  let datas;
  await axios(config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const get_enums = async (table_name, clm_name) => {
  var config = {
    method: "get",
    url: base_url + "api/v1/" + table_name + "/enums/" + clm_name,
    headers: {
      token: token,
    },
  };
  let datas;
  await axios(config)
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
      bildir.error(error.message);
    });
  return datas;
};
const system_control = async () => {
  if (token == undefined) token = store.getters.get_token;
  var config = {
    method: "get",
    url: base_url + "api/",
    headers: {
      token: token,
    },
  };
  let datas;
  await axios(config).catch(function (error) {
    if (error.response.data.message == "token_error" || error.response.data.message == "user_not_found") {
      store.commit("set_logged_in", false);
      localStorage.clear();
    }
    bildir.error(error.response.data.message);
  });
  return datas;
};
const get_cache = async () => {
  if (token == undefined) token = store.getters.get_token;
  const local_cache = JSON.parse(localStorage.getItem("cache"));
  let cache = local_cache;
  if (local_cache != null && local_cache?.time > new Date().getTime()) {
    console.info(
      "%c Yedekleme güncel:",
      " color: green",
      moment(local_cache?.time).format("HH:mm:ss"),
      moment().format("HH:mm:ss")
    );
  } else if (localStorage.getItem("cache_status") == "false") {
    console.info("%c Yedekleme Bekleniyor...", " color: yellow");

    if (local_cache?.time + 10000 < new Date().getTime()) localStorage.setItem("cache_status", "true");
  } else {
    console.info("%c Yedekleme güncelleniyor...", " color: red");
    localStorage.setItem("cache_status", "false");
    var config = {
      method: "get",
      url: base_url + "api/v2/front_cache",
      headers: {
        token: token,
      },
    };
    await axios(config)
      .then((res) => {
        cache = local_cache;
        localStorage.setItem("cache", JSON.stringify(res.data));
        cache = res.data;
        localStorage.setItem("cache_status", "true");
        console.info(
          "%c Yedekleme güncel:",
          " color: green",
          moment(res.data?.time).format("HH:mm:ss"),
          moment().format("HH:mm:ss")
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return cache;
};

export default { list, show, create, add, edit, update, clean, get_enums, get_cache, system_control, auths };
