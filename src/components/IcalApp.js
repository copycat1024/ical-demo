import React, { Component } from 'react';
import IcalHeader from './IcalHeader';
import IcalBluebox from './IcalBluebox';
import IcalRedbox from './IcalRedbox';
import IcalGreybox from './IcalGreybox';
import '../style/ical-app.css';

class IcalApp extends Component {
  render() {
    return (
      <div className="ical-app">
        <IcalHeader />
        <IcalRedbox />
        <IcalBluebox />
        <IcalGreybox />
      </div>
    );
  }
}

export default IcalApp;
