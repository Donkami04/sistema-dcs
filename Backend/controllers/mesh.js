const { Mesh } = require("../models/mesh");
const { DataMesh } = require("../models/data_mesh");

async function getMesh() {
  const numMesh = await getNumberMesh();

    const mesh = await Mesh.findAll({
      order: [["id", "DESC"]],
      limit: numMesh,
    });
    return mesh;
};

async function getNumberMesh() {
  const listMesh = await DataMesh.findAll();
  const numMesh = listMesh.length;
  return numMesh;
};

module.exports = { getMesh };