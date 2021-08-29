import React from 'react';

const Header = ({ interval, setDataInterval }) => {
  return (
    <div className="header">
      <img src="Coin360_Press_Kit_horizontal-white.svg" alt="" height={35} />
      <select
        name="interval"
        id="interval-selector"
        value={interval}
        onChange={e => (
          e.target.value === "custom"
            ? setDataInterval(prompt("Enter a value in hours or days.", "24h"))
            : setDataInterval(e.target.value))
        }
      >
        <option value="1h">Hour</option>
        <option value="24h">Day</option>
        <option value="7d">Week</option>
        <option value="30d">Month</option>
        <option value="custom">Custom</option>
      </select>
    </div>
  );
};

export default Header;
