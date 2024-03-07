const data = {
  info: require("../model/data.json"),
  setInfo: function (data) {
    this.info = data;
  },
};

const getAllEmployees = (req, res) => {
  console.log(req);
  res.json(data.info);
};

const addNewEmployee = (req, res) => {
  console.log(req.body);
  const newInfo = {
    id: data.info?.length ? data.info[data.info.length - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  data.setInfo([...data.info, newInfo]);
  res.status(200).json(data.info);
};

const updateEmployee = (req, res) => {
  const newInfo = data.info.find((info) => info.id === parseInt(req.body.id));
  //console.log(newInfo);

  newInfo.firstname = req.body.firstname;
  newInfo.lastname = req.body.lastname;
  const filteredData = data.info.filter(
    (info) => info.id !== parseInt(req.body.id)
  );
  console.log(filteredData);
  const finalData = [...filteredData, newInfo];
  //   data.setInfo(
  //     finalData.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  //   );
  data.setInfo(finalData);
  console.log(data.info);
  res.json(data.info);
};

const deleteEmployee = (req, res) => {
  const delInfo = data.info.filter((info) => info.id !== parseInt(req.body.id));

  data.setInfo(delInfo);
  res.json(data.info);
};

const getSingleEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
};
