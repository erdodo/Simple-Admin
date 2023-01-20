import axios from "axios";
const token = "4ed81a1bca39b6106b62d98d9a93c13b";
const list = async (table_name, params) => {
  var data = JSON.stringify(params);
  var config = {
    method: "post",
    url: "https://backend.erdoganyesil.com.tr/api/v1/" + table_name + "/list?token=" + token,

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
export default { list };
