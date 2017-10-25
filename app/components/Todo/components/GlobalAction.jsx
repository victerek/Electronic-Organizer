import React, { Component, PropTypes } from 'react';

// User actions Component

export default class GlobalAction extends Component {
  render() {
    return (
      <div className="clear_completed">
        <div className="btn-group" role="group">
          <button
            onClick={this.props.checkAll}
            type="button"
            className="btn btn-success"
            title="Finish all tasks">
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          </button>
          <button
            onClick={this.props.deleteCompleted}
            type="button"
            className="btn btn-danger"
            title="Delete completed tasks">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    )
  }
}
