import React from "react";

interface ProgressBarProps {
  bgcolor: string;
  color: string;
  progress: number;
  height: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  bgcolor,
  color,
  progress,
  height
}) => {
  const Parentdiv = {
    width: "100%",
    height: height,
    backgroundColor: bgcolor,
    borderRadius: `${height / 2}px`,
    border: "none"
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: `${height / 2}px`,
    textAlign: "right" as const
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

export default ProgressBar;
