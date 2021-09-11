import React, { useEffect, useState } from 'react';

const Footer = ({ timestamp, refereshData }) => {

  const [refereshCounter, setRefereshCounter] = useState(10);

  useEffect(() => {
    if (refereshCounter === 0) {
      refereshData();
      setRefereshCounter(10);
    } else {
      setTimeout(() => {
        setRefereshCounter(refereshCounter - 1);
      }, 1000);
    }
  }, [refereshCounter, refereshData])
  return (
    <center className="footer">
      <div className="refereshCounter">
        {`Data will referesh in ${refereshCounter} seconds`}
      </div>
      <div className="lastUpdate">
        {`Last updated: ${new Date(timestamp * 1000)}`}
      </div>
    </center>
  );
};

export default Footer;
