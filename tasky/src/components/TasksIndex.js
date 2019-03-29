import React, { Component } from "react";

class TasksIndex extends Component {
  renderActionButtons() {
    if (this.props.timer.active) {
      return (
        <div style={styles.buttonContainer}>
          <button className="btn red" onClick={() => this.props.onTimerStop()}>
            Stop Timer
          </button>
        </div>
      );
    }

    return (
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          className="btn green"
          onClick={() => this.props.onTimerStart()}
        >
          Iniciar
        </button>
        <button
          className="btn"
          onClick={() => this.props.onTaskDeactivate(this.props.activeTask)}
        >
          Desactivar
        </button>
      </div>
    );
  }

  render() {
    const { activeTask, timer } = this.props;

    if (!activeTask) {
      return (
        <div style={styles.container}>
          <h3>
            No tienes tareas activas :(
          </h3>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <h2>{`Tiempo restante ${timer.display}`}</h2>
        <h4>{`Tarea activa: ${activeTask.task}`}</h4>
        {this.renderActionButtons()}
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginBottom: "15px"
  }
};

export default TasksIndex;
