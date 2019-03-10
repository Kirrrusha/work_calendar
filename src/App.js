import React, {Component} from 'react';
import './App.scss';
import BigCalendar from 'react-big-calendar';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


class App extends Component {

  state = {
    workDay: [
      {
        name: 'День',
        color: ''
      }
    ],
    date: [new Date(2018, 2, 12)],
  };

  localizer = BigCalendar.momentLocalizer(moment);


  render() {
    return (
      <div className="example">
        <BigCalendar
          localizer={this.localizer}
          events={[]}
          step={60}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
        />
      </div>
    );
  }
}

export default App;
