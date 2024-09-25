import { useEffect, useRef, useState } from "react";
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
import "./imageAnimation.css";

const MusicPlayer = () => {
  // const [currentTime, setCurrentTime] = useState(0); // Current time of the song in seconds
  // const [duration, setDuration] = useState(202); // Total duration of the song in seconds (3:22 as an example)
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
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentMusicDetail, setCurrentMusicDetail] = useState({
  //   songName: "It's You",
  //   songArtist: "Ali Gatie",
  //   songSrc: "../../public/songs/Ali Gatie - It's You.mp3",
  //   songAvator: "/images/Ali Gatie - It's You.jpg",
  // });
  const [musicIndex, setMusicIndex] = useState(0);
  const [isRepeat, setIsRepeat] = useState(true);
  const [isShuffle, setIsShuffle] = useState(true);

  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const musicApi = [
    {
      songName: "It's You",
      songArtist: "Ali Gatie",
      songSrc: "../../public/songs/Ali Gatie - It's You.mp3",
      songAvator: "/images/Ali Gatie - It's You.jpg",
    },
    {
      songName: "Supermarket Flowers",
      songArtist: "Ed Sheeran",
      songSrc: "../../public/songs/Ed Sheeran  Supermarket Flowers.mp3",
      songAvator: "/images/Ed Sheeran  Supermarket Flowers.jpg",
    },
    {
      songName: "247, 365",
      songArtist: "Elijah woods",
      songSrc: "../../public/songs/elijah woods - 247, 365.mp3",
      songAvator: "/images/elijah woods - 247, 365.jpg",
    },
    {
      songName: "Eyes Blue x Heather",
      songArtist: "Fran Facilċ",
      songSrc: "../../public/songs/Fran Facilċ - Eyes Blue x Heather.mp3",
      songAvator: "/images/Fran Facilċ - Eyes Blue x Heather.jpg",
    },
    {
      songName: "All the kids are depressed",
      songArtist: "Jeremy Zucker",
      songSrc:
        "../../public/songs/Jeremy Zucker - all the kids are depressed.mp3",
      songAvator: "/images/Jeremy Zucker - all the kids are depressed.jpg",
    },
    {
      songName: "Always, i'll care",
      songArtist: "Jeremy Zucker",
      songSrc: "../../public/songs/Jeremy Zucker - always, i'll care.mp3",
      songAvator: "/images/Jeremy Zucker - always, i'll care.jpg",
    },
    {
      songName: "I Like Me Better",
      songArtist: "Lauv",
      songSrc: "../../public/songs/Lauv - I Like Me Better.mp3",
      songAvator: "/images/Lauv - I Like Me Better.jpg",
    },
    {
      songName: "Finally",
      songArtist: "Rex Orange County",
      songSrc: "../../public/songs/Rex Orange County - Finally.mp3",
      songAvator: "/images/Rex Orange County - Finally.jpg",
    },
    {
      songName: "Painkiller",
      songArtist: "Ruel",
      songSrc: "../../public/songs/Ruel - Painkiller.mp3",
      songAvator: "/images/Ruel - Painkiller.jpg",
    },
  ];

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      if (currentAudio.current) {
        if (prev) {
          currentAudio.current.pause();
        } else {
          currentAudio.current.play();
        }
      }
      return !prev;
    });
  };

  const handleNextBtn = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicApi.length);
      setMusicIndex(randomIndex);
    } else {
      setMusicIndex((prevIndex) => (prevIndex + 1) % musicApi.length);
    }
  };

  const handleBackBtn = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicApi.length);
      setMusicIndex(randomIndex);
    } else {
      setMusicIndex((prevIndex) => {
        return prevIndex === 0 ? musicApi.length - 1 : prevIndex - 1;
      });
    }
  };

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const handleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  // If the song ends and repeat is enabled, replay the song
  useEffect(() => {
    if (currentAudio.current) {
      const audioElement = currentAudio.current;
      const onEnd = () => {
        if (isRepeat) {
          audioElement.currentTime = 0;
          audioElement.play();
        } else {
          handleNextBtn();
        }
      };

      // Add event listener for the 'ended' event
      audioElement.addEventListener("ended", onEnd);

      // Clean up the event listener
      return () => {
        audioElement.removeEventListener("ended", onEnd);
      };
    }
  }, [isRepeat]);

  // Update audio src and play/pause the audio when musicIndex changes
  useEffect(() => {
    if (currentAudio.current) {
      currentAudio.current.src = musicApi[musicIndex].songSrc;
      if (isPlaying) {
        currentAudio.current.play();
      }
    }
  }, [musicIndex]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <audio src={musicApi[musicIndex].songSrc} ref={currentAudio}></audio>
      <Card
        className="bg-slate-600 font-roboto bg-transparent text-white rounded-2xl"
        style={{ width: 300 }}>
        <div className="text-center">
          <p className="text-xs">Music Player</p>
          <p className="text-xl py-6">{musicApi[musicIndex].songName}</p>
          <p className="text-sm pb-3">{musicApi[musicIndex].songArtist}</p>
        </div>

        <div>
          <img
            src={musicApi[musicIndex].songAvator}
            alt=""
            className={`rounded-full mx-auto object-contain w-32 h-32 transition-all duration-300 ${
              isPlaying ? "heartbeat" : ""
            }`}
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
          <FontAwesomeIcon
            icon={faShuffle}
            className={`cursor-pointer ${isShuffle ? "text-cyan-300" : ""}`}
            onClick={handleShuffle}
          />
          <FontAwesomeIcon
            icon={faBackwardStep}
            onClick={handleBackBtn}
            className="cursor-pointer"
          />
          <div className="w-3 self-top pt-0">
            {isPlaying ? (
              <FontAwesomeIcon
                icon={faPause}
                onClick={togglePlayPause}
                className="cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faPlay}
                onClick={togglePlayPause}
                className="cursor-pointer"
              />
            )}
          </div>
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={handleNextBtn}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faRepeat}
            className={`cursor-pointer ${isRepeat ? "text-cyan-300" : ""}`}
            onClick={handleRepeat}
          />
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
