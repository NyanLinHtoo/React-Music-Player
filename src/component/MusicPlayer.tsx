import { useState } from "react";
import { Card } from "antd";

import useSound from "use-sound";
import PlayButton from "./PlayButton";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(soundUrl, {
    onend: () => setIsPlaying(false),
  });
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <Card className="bg-slate-600 font-roboto" style={{ width: 300 }}>
        <div>
          <p>MusicPlayer</p>
          <p>Song name</p>
          <p>Artist</p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>00:00</p>
          <p>03:22</p>
        </div>
        <div>
          <p>Progress Bar</p>
        </div>
        <div>
          button group
          <p>back</p>
          <PlayButton
            className={styles.btn}
            active={isPlaying}
            size={60}
            iconColor="hsl(0deg 0% 100%)"
            idleBackgroundColor="hsl(210deg 15% 6%)"
            activeBackgroundColor="hsl(240deg 95% 62%)"
            play={() => {
              play();
              setIsPlaying(true);
            }}
            stop={() => {
              stop();
              setIsPlaying(false);
            }}
          />
          <p>next</p>
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
