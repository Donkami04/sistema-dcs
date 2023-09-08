import React, { Component } from "react";

class CreateEntityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntity: "", // Variable para seleccionar la entidad
      entityFields: {}, // Campos específicos de la entidad seleccionada
      availableEntities: ["DataUps", "DataWan"], // Lista de entidades disponibles
    };
  }

  renderEntityFields = () => {
    const { selectedEntity, entityFields } = this.state;

    switch (selectedEntity) {
      case "DataUps":
        return (
          <>
            <div>
              <label>IP:</label>
              <input
                type="text"
                value={entityFields.ip || ""}
                onChange={(e) =>
                  this.setState({
                    entityFields: { ...entityFields, ip: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label>Ubicación:</label>
              <input
                type="text"
                value={entityFields.ubication || ""}
                onChange={(e) =>
                  this.setState({
                    entityFields: {
                      ...entityFields,
                      ubication: e.target.value,
                    },
                  })
                }
              />
            </div>
          </>
        );

      case "DataWan":
        return (
          <div>
            <label>IP:</label>
            <input
              type="text"
              value={entityFields.ip || ""}
              onChange={(e) =>
                this.setState({
                  entityFields: { ...entityFields, ip: e.target.value },
                })
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  render() {
    const { selectedEntity, availableEntities } = this.state;

    return (
      <div>
        {/* Sección para seleccionar la entidad */}
        <div>
          <label>Selecciona la entidad:</label>
          <select
            value={selectedEntity}
            onChange={(e) => this.setState({ selectedEntity: e.target.value })}
          >
            <option value="">Selecciona una entidad</option>
            {availableEntities.map((entity) => (
              <option key={entity} value={entity}>
                {entity}
              </option>
            ))}
          </select>
        </div>

        {/* Sección para los campos de la entidad seleccionada */}
        {selectedEntity && (
          <div>
            <h3>Campos para {selectedEntity}</h3>
            {this.renderEntityFields()}
          </div>
        )}

        {/* Botón para enviar el formulario */}
        <button onClick={this.handleSubmit}>Crear</button>
      </div>
    );
  }

  handleSubmit = () => {
    // Aquí puedes enviar los datos al servidor (por ejemplo, a través de una solicitud POST a tu API REST).
    const { selectedEntity, entityFields } = this.state;
    console.log(`Creando ${selectedEntity} con datos:`, entityFields);
  };
}

export default CreateEntityForm;
