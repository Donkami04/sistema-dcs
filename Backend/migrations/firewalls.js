module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data_firewalls", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      num_conn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vdom: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("firewalls", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fw: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      canal: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      packet_loss: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      latency: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      jitter: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      failed_before: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      datetime: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_fw', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ultima_consulta: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data_firewalls");
    await queryInterface.dropTable("firewalls");
    await queryInterface.dropTable("fechas_consultas_fw");
  },
};
