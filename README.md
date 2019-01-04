# React time input

Smart time input for react applications

![Example](https://i.ibb.co/kmDcn6n/ezgif-com-video-to-gif.gif)

### Installation

```bash
$ npm install @dprovodnikov/time-input
```

### Usage example

You provide your own input representation using render props

```javascript
import TimeInput from '@dprovodnikov/time-input';

...

return (
  <TimeInput
    time={this.state.time}
    onChange={time => this.setState({ time })}
  >
    {({ value, onChange, onKeyDown, onBlur }) => (
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    )}
  </TimeInput>
);
```

### Available props

| Prop | Type | Description |
|:----:|:----:|:-----------:|
| value | String | The intermediate input value |
| invalid | Bool | The input value validity indicator |
| onChange | Func | Input value change event handler |
| onKeyDown | Func | Input value keyDown event handler |
| onBlur | Func | Input value blur event handler |


### License
MIT

