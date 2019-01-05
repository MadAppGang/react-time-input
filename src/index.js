import { Component } from 'react';
import PropTypes from 'prop-types';
import { onEnterKey, when } from './utils';
import * as Time from './time';

class TimeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: Time.stringify(props.time) || '12:00 pm',
      invalid: false,
    };

    this.dispatchChange = this.dispatchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { time } = this.props;
    const hasTimeChanged = time !== prevProps.time;

    if (time && hasTimeChanged) {
      this.updateValue(time);
    }
  }

  updateValue(time) {
    this.setState({
      value: Time.stringify(time),
    });
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      value,
      invalid: !Time.isAcceptable(value),
    });
  }

  dispatchChange({ target }) {
    this.props.onChange(Time.parse(target.value));
  }

  handleBlur(event) {
    if (this.state.invalid) {
      return;
    }

    this.dispatchChange(event);
  }

  render() {
    const { value, invalid } = this.state;

    return this.props.children({
      value,
      invalid,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onKeyDown: onEnterKey(this.dispatchChange),
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

export default TimeInput;
