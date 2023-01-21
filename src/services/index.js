import axios from "axios";
const token = "4ed81a1bca39b6106b62d98d9a93c13b";
const base_url = "https://backend.erdoganyesil.com.tr/";
const list = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    method: "post",
    url: base_url + "api/v1/" + table_name + "/list?token=" + token,

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
const create = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    method: "post",
    url: base_url + "api/v1/" + table_name + "/create?token=" + token,

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
export default { list, create };
