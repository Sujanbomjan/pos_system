import React from "react";
interface NumberProps {
  value: any;
}
const NumberWithCommas = ({ value }: NumberProps) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return <span>{formattedNumber}</span>;
};

export default NumberWithCommas;
