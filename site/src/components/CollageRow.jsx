import React from "react";
// import {Component} from 'react';

function CollageRow({ startIndex, numColumns, images, movieIDs, width }) {
  var columns = [];

  var multiplier = 1;
  for (var i = startIndex; i < startIndex + numColumns; i++) {
    //get -1 or +1
    multiplier *= -1;
    //12 degrees of rotation (clockwise or counter-clockwise)
    var randNum = 12 * multiplier;
    columns.push(
      <div
        key={"collageRow" + i}
        className="vCol"
        style={{ width: width + "%", transform: "rotate(" + randNum + "deg)" }}
      >
        <img className={movieIDs[i]} src={images[i]} />
      </div>
    );
  }

  return <div className="vRow">{columns}</div>;
}

export default CollageRow;
