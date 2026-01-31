import React from "react";
import "./RoomCardSkeleton.css";

function RoomCardSkeleton() {
  return (
    <div className="room-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text short"></div>
        <div className="skeleton-features">
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}

export default RoomCardSkeleton;