import React, { useState, useEffect } from 'react';
import { DualRangeStyle } from './styles.js';

const DualRange = ({
  defaultFrom,
  defaultTo,
  min,
  max,
  step,
  onChangeFrom,
  onChangeTo,
}) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(100);

  useEffect(() => {
    let newFrom = from;
    if (from > to) {
      newFrom = to - 1;
      setFrom(newFrom);
    }
    onChangeFrom(newFrom);
  }, [from]);

  useEffect(() => {
    let newTo = to;
    if (to < from) {
      newTo = +from + 1;
      setTo(newTo);
    }
    onChangeTo(newTo);
  }, [to]);

  useEffect(() => {
    setFrom(defaultFrom);
    setTo(defaultTo);
  }, []);

  return (
    <DualRangeStyle>
      <div className='sliders_control'>
        <input
          id='fromSlider'
          type='range'
          value={from}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          id='toSlider'
          type='range'
          value={to}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
    </DualRangeStyle>
  );
};

export default DualRange;
