import { Component } from 'react';
import PropTypes from 'prop-types';
import * as Time from './utils';

const ENTER = 'Enter';
const ENTER_KEYCODE = 13;

const defaultTime = Time.parse('12:00 PM');

class TimeInput extends Component {
  constructor(props) {
    super(props);

    const time = props.time || defaultTime;

    this.state = {
      value: Time.stringify(time),
      invalid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { time } = this.props;
    const timeHasChanged = time !== prevProps.time;

    if (time && timeHasChanged) {
      this.updateTime(time);
    }
  }

  updateTime(time) {
    this.setState({
      value: Time.stringify(time),
    });
  }

  getValue(time) {
    return Time.stringify(time);
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      value,
      invalid: !Time.isValid(value),
    });
  }

  handleBlur(event) {
    const { value } = event.target;

    if (value) {
      this.props.onChange(Time.parse(value));
    } else {
      this.setState({ value, invalid: true });
    }
  }

  handleKeyDown(event) {
    if (this.state.invalid) {
      return;
    }
    
    if (event.key === ENTER || event.keyCode === ENTER_KEYCODE) {
      this.handleBlur(event);
    }
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
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    prefix: PropTypes.oneOf([Time.AM, Time.PM]),
  }),
};

TimeInput.defaultProps = {
  time: defaultTime,
};

export default TimeInput;
