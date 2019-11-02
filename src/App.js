import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.scss';
import moment from 'moment';
import Select from 'react-select';


class App extends Component {

  state = {
    selectedOption: null,
    periodOption: null,
    workDay: [
      {
        label: 'В день',
        value: 'Day',
        hexColor: '#184af0'
      },
      {
        label: 'В ночь',
        value: 'Night',
        hexColor: '#ffea00'
      },
      {
        label: 'После ночи',
        value: 'After night',
        hexColor: '#c22994'
      },
      {
        label: 'Отдых',
        value: 'relax',
        hexColor: '#ff0303'
      }
    ],
    period: [
      {
        label: '1 месяц',
        value: 1
      },
      {
        label: '2 месяца',
        value: 2
      },
      {
        label: '3 месяца',
        value: 3
      },
      {
        label: '4 месяца',
        value: 4
      },
      {
        label: '5 месяцев',
        value: 5
      },
      {
        label: 'Пол-года',
        value: 6
      },
      {
        label: '7 месяцев',
        value: 7
      },
      {
        label: '8 месяцев',
        value: 8
      },
      {
        label: '9 месяцев',
        value: 9
      },
      {
        label: '10 месяцев',
        value: 10
      },
      {
        label: '11 месяцев',
        value: 11
      },
      {
        label: 'год',
        value: 12
      }
    ],
    values: []
  };

  localizer = BigCalendar.momentLocalizer(moment);

  handleSelectWorkDay = (selectedOption) => {
    this.setState({ selectedOption }, () => this.changeValues());
  }

  handleSelectPeriod = (periodOption) => {
    this.setState({ periodOption }, () => this.changeValues());
  }

  changeValues() {
    const {workDay, periodOption, selectedOption} = this.state;
    if (periodOption && selectedOption) {
      let values = [];
      const indexWorkDay = workDay.findIndex(w => w.value === selectedOption.value);
      let selectedValues = workDay.filter((e, index) => {
        if (index >= indexWorkDay) {
          return e;
        }
      });
      selectedValues = selectedValues.map((e, index) => {
        return {
          title: e.label,
          start: moment().add(index, 'days').format('MMMM DD YYYY'),
          end: moment().add(index, 'days').format('MMMM DD YYYY'),
          hexColor: e.hexColor
        }
      })
      values = values.concat(selectedValues);
      for (let i = selectedValues.length; i < periodOption['value'] * 30; i++) {
        values.push({
          title: workDay[i % 4].label,
          start: moment().add(i, 'days').format('MMMM DD YYYY'),
          end: moment().add(i, 'days').format('MMMM DD YYYY'),
          hexColor: workDay[i % 4].hexColor
        });
      }
      this.setState({ values });
    }
  }

  eventStyleGetter =  (event, start, end, isSelected) => {
  var backgroundColor = event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block'
  };
  return {
    style: style
  };
}

  render() {
    const { selectedOption, workDay, periodOption, period, values } = this.state;
    if (!values) return null;
    return (
      <div className="example">
        <Select
          value={selectedOption}
          onChange={this.handleSelectWorkDay}
          options={workDay}
        />

        <Select
          value={periodOption}
          onChange={this.handleSelectPeriod}
          options={period}
        />

        <BigCalendar
          localizer={this.localizer}
          events={values}
          step={60}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(this.eventStyleGetter)}
          showMultiDayTimes
        />
      </div>
    );
  }
}

export default App;
