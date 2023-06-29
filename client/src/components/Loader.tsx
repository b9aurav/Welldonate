import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="loader fixed top-0 left-0 h-full w-full flex items-center justify-center z-50">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default Loader;
