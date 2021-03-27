import React from "react";
import LoadingIcon from './media/book-loading.gif'

function Loading() {
  return (
    <div className="text-center">
      <img src={LoadingIcon} alt="Loading..." />
    </div>
  );
}

export default Loading;
