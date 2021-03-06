import React, { useState, useEffect } from "react";

import "./Feed.css";

const Feed = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    getUpdate();
  }, []);

  async function getUpdate() {
    const res = await fetch(`${process.env.API_DOMAIN}/api/GetVideos`);
    const { updates } = await res.json();
    setUpdates(updates);
  }

  const feedItems = (
    <div>
      <div id="bumper" className="line-item"></div>
      {updates.map(({ name, video, created }) => (
        <div className="columns line-item is-vcentered">
          <div className="column feed-line">
            <span class="created">{created}</span>
            <div class="time-line"></div>
          </div>
          <div className="column feed-item">
            <div className="">
              <div className="box video-wrapper">
                <h3 className="is-size-4">{name}</h3>
                <video class="video" controls width="500px">
                  <source src={video} type="video/webm" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="feed">
      {updates.length > 0 ? (
        feedItems
      ) : (
        <div>
          <img id="loader" src="loader.svg" alt="" />
        </div>
      )}
    </div>
  );
};

export default Feed;
