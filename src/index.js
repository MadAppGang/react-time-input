import { Component } from 'react';
import PropTypes from 'prop-types';
import { AM, PM, zerofy } from './utils';
class TimeInput extends Component {
  constructor(props) {
    super(props);

    const defaultTime = {
      hours: 0,
      minutes: 0,
      prefix: AM,
    };

    const value = props.time || defaultTime;

    this.state = {
      value: this.getTimeString(value),
      invalid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps({ time }) {
    if (time && time !== this.props.time) {
      this.updateTime(time);
    }
  }

  updateTime(time) {
    this.setState({
      value: this.getTimeString(time),
    });
  }

  validate(value) {
    if (!value) {
      return false;
    } 

    value = value.toLowerCase()
      .replace(/\s/, '')
      .replace(':', '')
      .replace('am', '')
      .replace('pm', '')
      .replace('a', '')
      .replace('p', '');

    return !isNaN(value);
  }

  parse(input) {
    const value = input
      .replace(/\s/, '')
      .replace('-', '')
      .toLowerCase();

    let hours, minutes;

    if (value.includes(':')) {
      [hours, minutes] = value.slice(0, 5).split(':');
      if (hours < 10) {
        [hours, minutes] = value.slice(0, 4).split(':');
      }
    } else {
      hours = value.slice(0, 2);
      if (isNaN(hours)) {
        hours = value.slice(0, 1);
      }
      minutes = value.slice(2, 4);
    }

    if (!minutes || isNaN(minutes)) {
      minutes = 0;
    }

    let prefix = AM;

    if (value.endsWith('p') || value.endsWith('pm')) {
      prefix = PM;
    }

    if (value.endsWith('a') || value.endsWith('am')) {
      prefix = AM;
    }

    hours = Number(hours);
    minutes = Number(isNaN(minutes) ? minutes.slice(0, 1) * 10 : minutes);

    if (hours > 12) {
      hours -= 12;
      if (hours <= 24) {
        prefix = PM;
      }
    }

    if (hours > 12) {
      hours = 12;
    }

    if (minutes > 59) {
      hours += Math.floor(minutes / 60);
      minutes = Math.floor(minutes % 60);
    }

    if (hours === 12 && prefix === AM) {
      hours = 0;
    }

    if (isNaN(hours)) {
      hours = 12;
    }

    if (isNaN(minutes)) {
      minutes = 0;
    }
    
    return Object.freeze({
      hours, minutes, prefix,
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      value,
      invalid: !this.validate(value),
    });
  }

  handleBlur(event) {
    const { value } = event.target;

    if (value) {
      this.props.onChange(this.parse(value));
    } else {
      this.setState({ value, invalid: true });
    }
  }

  handleKeyDown(event) {
    if (this.state.invalid) {
      return;
    }
    
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleBlur(event);
    }
  }

  getTimeString(time) {
    const hours = time.hours === 0 ? 12 : time.hours;
    return `${hours}:${zerofy(time.minutes)} ${time.prefix}`;
  }
  
  render() {
    return this.props.children({
      invalid: this.state.invalid,
      value: this.state.value,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
    });
  }
}

TimeInput.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TimeInput;
