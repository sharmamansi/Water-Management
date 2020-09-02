import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({ key, props, params }) {
  return (
    <div id="ren">
      <div class="card transparent">
        <div class="card-content white-text">
          <span class="card-title ">{props.name}</span>
          <p>{props.id}</p>
        </div>
        <a
          className="btn-floating halfway-fab waves-effect waves-light red"
          href={`/listing/${props.id}`}
        >
          <i class="material-icons">add</i>
        </a>
      </div>
    </div>
  );
}
