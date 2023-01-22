import axios from "axios";
import moment from "moment/moment";

const token = "4ed81a1bca39b6106b62d98d9a93c13b";
const base_url = "https://backend.erdoganyesil.com.tr/";

const list = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    method: "post",
    url: base_url + "api/v1/" + table_name + "/list",
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
    });
  return datas;
};
const add = async (table_name, params) => {
  const url = base_url + "api/v1/" + table_name + "/add";
  const headers = {
    token: token,
    "Content-Type": "multipart/form-data",
  };
  let datas;
  await axios
    .post(url, params, { headers })
    .then((res) => {
      datas = res.data;
    })
    .catch(function (error) {
      console.log(error);
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
    });
  return datas;
};
const get_cache = async () => {
  const local_cache = JSON.parse(localStorage.getItem("cache"));
  let cache = {};
  if (local_cache != null && local_cache?.time > new Date().getTime()) {
    console.info(
      "%c Yedekleme güncel:",
      " color: green",
      moment(local_cache?.time).format("HH:mm:ss"),
      moment().format("HH:mm:ss")
    );
    cache = local_cache;
  } else if (localStorage.getItem("cache_status") == "false") {
    console.info("%c Yedekleme Bekleniyor...", " color: yellow");
    cache = local_cache;

    if (local_cache?.time + 30000 < new Date().getTime()) localStorage.setItem("cache_status", "true");
  } else {
    cache = local_cache;
    console.info("%c Yedekleme güncelleniyor...", " color: red");
    localStorage.setItem("cache_status", "false");
    var config = {
      method: "get",
      url: base_url + "api/v2/front_cache",
      headers: {
        token: token,
      },
    };
    axios(config)
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

export default { list, show, create, add, edit, update, clean, get_enums, get_cache };
