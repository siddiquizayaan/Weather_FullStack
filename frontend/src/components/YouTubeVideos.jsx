// === src/components/YouTubeVideos.jsx ===
import React from "react";

const YouTubeVideos = ({ videos }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div>
      <h3>Explore {videos[0].snippet.title.split(" ")[0]} on YouTube</h3>
      <div className="forecast-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="card">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "100%" }}
              />
              <p>{video.snippet.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
