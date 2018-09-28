import React, { Component } from 'react';

class IcalTimetableItem extends Component {
  render() {
    let { course, teacher } = this.props.item;
    return (
      <div className="ical-timetable-item agenda-cell-item">
        <p>{course}</p>
        <p>{teacher}</p>
      </div>
    );
  }
}

export default IcalTimetableItem;