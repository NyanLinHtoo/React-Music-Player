// import { useEffect, useRef, useState } from "react";
import { Card, Slider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = () => {
  // const [currentTime, setCurrentTime] = useState(0); // Current time of the song in seconds
  // const [duration, setDuration] = useState(202); // Total duration of the song in seconds (3:22 as an example)
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef(null); // Ref for the audio element

  // // Mock useEffect to simulate song playing
  // useEffect(() => {
  //   if (isPlaying) {
  //     const interval = setInterval(() => {
  //       setCurrentTime((prevTime) => (prevTime < duration ? prevTime + 1 : duration));
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isPlaying, currentTime, duration]);

  // // Handle Slider change event to seek music
  // const handleSliderChange = (value) => {
  //   setCurrentTime(value); // Update current time with the slider value
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = value; // Sync the audio element's current time (if using an actual audio element)
  //   }
  // };

  // // Calculate the progress percentage
  // const progress = (currentTime / duration) * 100;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <Card
        className="bg-slate-600 font-roboto bg-transparent text-white rounded-2xl"
        style={{ width: 300 }}>
        <div className="text-center">
          <p className="text-xs">Music Player</p>
          <p className="text-xl py-6">Song name</p>
          <p className="text-sm pb-3">Artist</p>
        </div>

        <div>
          <img
            src="https://via.placeholder.com/150"
            alt=""
            className="rounded-full mx-auto object-cover"
          />
        </div>

        <div className="flex justify-between pt-3">
          <p>00:00</p>
          <p>03:22</p>
        </div>
        <div className="pb-3">
          <Slider
            // min={0}
            // max={duration}
            // value={currentTime}
            // onChange={handleSliderChange}
            tooltip={{ open: false }}
          />
        </div>

        <div className="flex justify-between items-baseline">
          <FontAwesomeIcon icon={faShuffle} />
          <FontAwesomeIcon icon={faBackwardStep} />
          <div>
            <FontAwesomeIcon icon={faPlay} />
            {/* <FontAwesomeIcon icon={faPause} /> */}
          </div>
          <FontAwesomeIcon icon={faForwardStep} />
          <FontAwesomeIcon icon={faRepeat} />
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
