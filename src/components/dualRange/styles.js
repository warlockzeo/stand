import styled from 'styled-components';

export const DualRangeStyle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  position: relative;

  .sliders_control {
    flex: 1;
    position: relative;
    min-height: 50px;
  }

  .form_control {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: #635a5a;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #c6c6c6;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #c6c6c6;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb:hover {
    background: #f7f7f7;
  }

  input[type='range']::-webkit-slider-thumb:active {
    box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
    -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    width: 100%;
    position: absolute;
    background-color: #c6c6c6;
    pointer-events: none;
  }

  #fromSlider {
    height: 0;
    z-index: 1;
  }
`;
