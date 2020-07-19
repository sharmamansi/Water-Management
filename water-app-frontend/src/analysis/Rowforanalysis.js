import React from 'react'

export default function Rowforanalysis({props}) {
    console.log(props);
  return (
    <tr>
            <td>{props.supplyport}</td>
            <td>{props.recieveport}</td>
            <td>{props.lossPercentage}</td>
          </tr>
  )
}
