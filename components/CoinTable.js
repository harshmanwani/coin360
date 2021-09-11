import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import useWindowDimensions from '../utils/useWindowDimension';

const CoinTable = ({ dataset }) => {

  const { width, height } = useWindowDimensions();

  const getPriceChange = (rowIndex, columnIndex, defaultCellStyle) => {
    const coinX = dataset[columnIndex - 1];
    const coinY = dataset[rowIndex - 1];
    if (coinX["p"] === coinY["p"]) {
      return <div style={defaultCellStyle} title={`${coinX["s"]}/${coinY["s"]}`}>
        -
      </div>
    };

    // There definitely can be other better ways to calculate this or can be done easily with mathjs kinda library.
    // But I'm just approaching it straight simple right now. Can be improved if given more time to it.

    // Using CoinX to CoinY relation
    const coinXPrice = coinX["p"];
    const coinYPrice = coinY["p"];

    const currentExchangePrice = coinXPrice / coinYPrice;

    const coinXPrevoiusPrice = coinXPrice * (1 + (coinX["ch"] / 100));
    const coinYPrevoiusPrice = coinYPrice * (1 + (coinY["ch"] / 100));

    const previousExchangePrice = coinXPrevoiusPrice / coinYPrevoiusPrice;

    const changeInPrice = currentExchangePrice - previousExchangePrice;
    const changeinPercent = (changeInPrice / currentExchangePrice) * 100;

    return <div
      style={{
        ...defaultCellStyle,
        background: changeinPercent > 0
          ? `rgba(124,193,130,${Math.abs(changeinPercent / 10)})`
          : `rgba(202,64,64,${Math.abs(changeinPercent / 10)})`,
      }}
      title={`${coinX["s"]}/${coinY["s"]}`}
    >
      {`${Number(changeinPercent).toFixed(2)}%`};
    </div>
  }

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const defaultCellStyle = {
      ...style,
      borderRight: "1px solid gray",
      borderBottom: "1px solid gray",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
    if (rowIndex === 0 && columnIndex === 0) {
      return <div style={defaultCellStyle}>
        <img src="Logo Square Monochrome Black.svg" alt="" width={25} />
      </div>
    } else if (rowIndex === 0 || columnIndex === 0) {
      return <div style={defaultCellStyle}>
        {
          rowIndex === 0
            ? `${dataset[columnIndex - 1]["s"]}`
            : `${dataset[rowIndex - 1]["s"]}`
        }
      </div>
    } else {
      return getPriceChange(rowIndex, columnIndex, defaultCellStyle) //AI
    }
  };

  return (
    <div className="coin-table">
      {/* Using React-window to render the table because its a large dataset and this generates a virtualized grid hence the performance is better :) */}
      <Grid
        columnCount={dataset.length + 1}
        columnWidth={100}
        rowCount={dataset.length + 1}
        rowHeight={50}
        width={width - 100}
        height={height - 125}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default CoinTable;
