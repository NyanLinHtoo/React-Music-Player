import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Slider, Typography } from "antd";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [isRepeat, setIsRepeat] = useState(true);
  const [isShuffle, setIsShuffle] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const { Text } = Typography;

  const musicApi = [
    {
      songName: "It's You",
      songArtist: "Ali Gatie",
      songSrc: "/songs/Ali Gatie - It's You.mp3",
      songAvator: "/images/Ali Gatie - It's You.jpg",
      songBgColor: "#295fb1",
    },
    {
      songName: "Supermarket Flowers",
      songArtist: "Ed Sheeran",
      songSrc: "/songs/Ed Sheeran  Supermarket Flowers.mp3",
      songAvator: "/images/Ed Sheeran  Supermarket Flowers.jpg",
      songBgColor: "#94caeb",
    },
    {
      songName: "247, 365",
      songArtist: "Elijah woods",
      songSrc: "/songs/elijah woods - 247, 365.mp3",
      songAvator: "/images/elijah woods - 247, 365.jpg",
      songBgColor: "#e08736",
    },
    {
      songName: "Eyes Blue x Heather",
      songArtist: "Fran Facilċ",
      songSrc: "/songs/Fran Facilċ - Eyes Blue x Heather.mp3",
      songAvator: "/images/Fran Facilċ - Eyes Blue x Heather.jpg",
      songBgColor: "#1d3d86",
    },
    {
      songName: "All the kids are depressed",
      songArtist: "Jeremy Zucker",
      songSrc: "/songs/Jeremy Zucker - all the kids are depressed.mp3",
      songAvator: "/images/Jeremy Zucker - all the kids are depressed.jpg",
      songBgColor: "#2a3054",
    },
    {
      songName: "Always, i'll care",
      songArtist: "Jeremy Zucker",
      songSrc: "/songs/Jeremy Zucker - always, i'll care.mp3",
      songAvator: "/images/Jeremy Zucker - always, i'll care.jpg",
      songBgColor: "#918078",
    },
    {
      songName: "I Like Me Better",
      songArtist: "Lauv",
      songSrc: "/songs/Lauv - I Like Me Better.mp3",
      songAvator: "/images/Lauv - I Like Me Better.jpg",
      songBgColor: "#676868",
    },
    {
      songName: "Finally",
      songArtist: "Rex Orange County",
      songSrc: "/songs/Rex Orange County - Finally.mp3",
      songAvator: "/images/Rex Orange County - Finally.jpg",
      songBgColor: "#0c150e",
    },
    {
      songName: "Painkiller",
      songArtist: "Ruel",
      songSrc: "/songs/Ruel - Painkiller.mp3",
      songAvator: "/images/Ruel - Painkiller.jpg",
      songBgColor: "#E7B604",
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

  // Use useCallback to memoize handleNextBtn to avoid recreating it on every render
  const handleNextBtn = useCallback(() => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicApi.length);
      setMusicIndex(randomIndex);
    } else {
      setMusicIndex((prevIndex) => (prevIndex + 1) % musicApi.length);
    }
  }, [isShuffle, musicApi.length]);

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
      const onTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime); // Update current time
      };
      const onLoadedMetadata = () => {
        setDuration(audioElement.duration); // Set duration once audio is loaded
      };
      const onEnd = () => {
        if (isRepeat) {
          audioElement.currentTime = 0;
          audioElement.play();
        } else {
          handleNextBtn();
        }
      };

      // Add event listener for the 'ended' event
      audioElement.addEventListener("timeupdate", onTimeUpdate);
      audioElement.addEventListener("loadedmetadata", onLoadedMetadata);
      audioElement.addEventListener("ended", onEnd);

      return () => {
        audioElement.removeEventListener("timeupdate", onTimeUpdate);
        audioElement.removeEventListener("loadedmetadata", onLoadedMetadata);
        audioElement.removeEventListener("ended", onEnd);
      };
    }
  }, [isRepeat, handleNextBtn]);

  // Update audio src and play/pause the audio when musicIndex changes
  useEffect(() => {
    if (currentAudio.current) {
      currentAudio.current.src = musicApi[musicIndex].songSrc;
      if (isPlaying) {
        currentAudio.current.play();
      }
    }
  }, [musicIndex]);

  const handleProgessChange = (value: number) => {
    if (currentAudio.current) {
      console.log(
        currentAudio.current.currentTime,
        currentAudio.current.duration
      );
      currentAudio.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className="flex justify-center items-center h-screen "
      style={{
        background: `linear-gradient(135deg, ${musicApi[musicIndex].songBgColor}, #000)`,
      }}>
      <audio src={musicApi[musicIndex].songSrc} ref={currentAudio}></audio>
      <Card
        // title="Sound Stream"
        bordered={false}
        className="drop-shadow-2xl font-roboto backdrop-blur-sm bg-white/15 text-white rounded-2xl text-center "
        style={{ width: 300 }}>
        <div className="text-center pb-6">
          <Text italic strong className="text-xl pb-3 text-white block">
            {musicApi[musicIndex].songName}
          </Text>
          <Text className="text-xs  text-white">
            {musicApi[musicIndex].songArtist}
          </Text>
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
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </div>
        <div className="pb-3">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgessChange}
            tooltip={{ open: false }}
          />
        </div>

        <div className="flex justify-between items-baseline">
          <FontAwesomeIcon
            icon={faShuffle}
            className={`cursor-pointer ${
              isShuffle ? "text-rose-500 " : "brightness-50"
            }`}
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
            className={`cursor-pointer ${
              isRepeat ? "text-rose-500" : "brightness-50"
            }`}
            onClick={handleRepeat}
          />
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
