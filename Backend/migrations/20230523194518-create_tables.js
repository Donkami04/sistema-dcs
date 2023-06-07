'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('csp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('css', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('cnp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('cns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('hse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('cnpb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('cnsb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
    });

    await queryInterface.createTable('switches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dispositivo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ups1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ups2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_ups1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_ups2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      }
    });

    await queryInterface.createTable('data_clients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      id_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('data_switches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dispositivo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_clientes', {
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

    await queryInterface.createTable('fechas_consultas_switches', {
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

    await queryInterface.createTable('data_ups', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('ups', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      batery: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      switch: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_ups', {
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
    await queryInterface.dropTable('csp');
    await queryInterface.dropTable('css');
    await queryInterface.dropTable('cnp');
    await queryInterface.dropTable('cns');
    await queryInterface.dropTable('hse');
    await queryInterface.dropTable('cnpb');
    await queryInterface.dropTable('cnsb');
    await queryInterface.dropTable('switches');
    await queryInterface.dropTable('data_switches');
    await queryInterface.dropTable('data_clients');
    await queryInterface.dropTable('fechas_consultas_switches');
    await queryInterface.dropTable('fechas_consultas_clientes');
    await queryInterface.dropTable('data_ups');
    await queryInterface.dropTable('ups');
    await queryInterface.dropTable('fechas_consultas_ups');
  },
};
