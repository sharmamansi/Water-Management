import React from "react";

export default function Table({ data }) {
  console.log(data);
  return (
    <tr>
      <td>{data.rport}</td>
      <td>{data.sport}</td>
      <td>{data.amount}</td>
      <td>{data.month}</td>
      <td>{data.year}</td>
    </tr>
  );
}
