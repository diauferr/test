import React from 'react';

interface ILoadingProps {
  text?: string;
}

const Loading: React.FC<ILoadingProps> = ({ text }) => (
  <div className="container-loading">
    <div className="spinner  animated fadeIn  " />
    <p className=" animated fadeIn  ">{text} &nbsp; </p>
  </div>
);

export default Loading;
