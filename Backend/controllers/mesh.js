const { Mesh } = require("../models/mesh");

async function getMesh() {
    const mesh = await Mesh.findAll({
      order: [["id", "DESC"]],
      limit: 9,
    });
    return mesh;
};

module.exports = { getMesh };