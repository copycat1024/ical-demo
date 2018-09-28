import React, { Component } from 'react'
import { ReactAgenda,  guid } from 'react-agenda'
import test from './test'
import IcalTimetableItem from './IcalTimetableItem'
import '../style/ical-bluebox.css'

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}

var items = test.data.map((item) => ({
  _id : guid(),
  course: item.summary,
  teacher: item.description,
  startDateTime: new Date(item.start.dateTime),
  endDateTime: new Date(item.end.dateTime),
  classes       : 'color-1'
}));

var now = new Date();

class Agenda extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:items,
      selected:[],
      cellHeight:10,
      showModal:false,
      locale:"fi",
      rowsPerHour:4,
      numberOfDays:7,
      startDate: new Date()
    }
  }

  render() {
    return (
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
        startDate={this.state.startDate}
        cellHeight={this.state.cellHeight}
        locale={this.state.locale}
        items={this.state.items}
        numberOfDays={this.state.numberOfDays}
        rowsPerHour={this.state.rowsPerHour}
        itemColors={colors}
        autoScale={true}
        fixedHeader={true}
        itemComponent={IcalTimetableItem}
      />
    );
  }
}

class IcalBluebox extends Component {
  render() {
    return (
      <div className="ical-bluebox">
        <Agenda />
      </div>
    );
  }
}

export default IcalBluebox;
