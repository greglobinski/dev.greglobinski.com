import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      loading...
      {/* --- STYLES --- */}
      <style jsx>{`
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      `}</style>
    </div>
  );
};

export default Loading;
