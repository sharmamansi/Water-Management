import React from "react";

export default function Tablerow({ data }) {
  //    console.log(data);
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.portname}</td>
    </tr>
  );
}
