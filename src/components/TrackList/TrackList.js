

import React from "react";
import "./TrackList.css";

import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    const { tracks } = this.props;


    if (!Array.isArray(tracks)) {
      return null; 
    }

    return (
      <div className="TrackList">
        {tracks.map((track) => (
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
