import React, {Component} from 'react';
import './App.scss';
import BigCalendar from 'react-big-calendar';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
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
        color: ''
      },
      {
        label: 'В ночь',
        value: 'Night',
        color: ''
      },
      {
        label: 'После ночи',
        value: 'After night',
        color: ''
      },
      {
        label: 'Отдых',
        value: 'relax',
        color: ''
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
    ],
    values: []
  };

  localizer = BigCalendar.momentLocalizer(moment);

  handleSelectWorkDay = (selectedOption) => {
    console.log(selectedOption)
    this.setState({ selectedOption }, () => this.changeValues());
  }

  handleSelectPeriod = (periodOption) => {
    console.log(periodOption)
    this.setState({ periodOption }, () => this.changeValues());
  }

  changeValues() {
    const {workDay, periodOption, period, selectedOption} = this.state;
    if (periodOption && selectedOption) {
      let values = [];
      console.log('index', workDay.findIndex(w => w.value === selectedOption.value));
      const selectedValues = workDay.map(e => e)
        .splice(workDay.findIndex(w => w.value === selectedOption.value), workDay.length);
      values = values.concat(selectedValues);
      for (let i = 0; i < periodOption['value'] * 30; i++) {
        values.push(workDay[i % 4]);
      }
      console.log(values);
      this.setState({ values });
    }
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
          events={[]}
          step={60}
          startAccessor="start"
          endAccessor="end"
          views={values}
          showMultiDayTimes
        />
      </div>
    );
  }
}

export default App;
