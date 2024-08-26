"use client";

import React from "react";

interface PitchControlProps {
  pitch: number;
  onPitchChange: (pitch: number) => void;
}

const PitchControl: React.FC<PitchControlProps> = ({
  pitch,
  onPitchChange,
}) => {
  return (
    <div>
      <label htmlFor="pitch">Pitch: {pitch.toFixed(2)}</label>
      <input
        type="range"
        id="pitch"
        min="0.5"
        max="10"
        step="0.01"
        value={pitch}
        onChange={(e) => onPitchChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default PitchControl;
