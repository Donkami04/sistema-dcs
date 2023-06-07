  const { Sequelize } = require("sequelize");
  const config = require("../config/config");
  const env = "development";
  const dbConfig = config[env];

  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: false,
    },
  );

// Función para verificar la conexión a la base de datos
async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "La conexión a la base de datos se ha establecido correctamente."
    );
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

checkDatabaseConnection();

module.exports = sequelize;
