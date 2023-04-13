import React from "react";
// import {Component} from 'react';

function CollageRow({ startIndex, numColumns, images, width }) {
  var columns = [];

  for (var i = startIndex; i < startIndex + numColumns; i++) {
    //get -1 or +1
    var randNum = Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1);
    //12 degrees of rotation (clockwise or counter-clockwise)
    randNum *= 12;
    columns.push(
      <div
        key={"collageRow" + i}
        className="vCol"
        style={{ width: width + "%", transform: "rotate(" + randNum + "deg)" }}
      >
        <img src={images[i]} />
      </div>
    );
  }

  return <div className="vRow">{columns}</div>;
}

export default CollageRow;
