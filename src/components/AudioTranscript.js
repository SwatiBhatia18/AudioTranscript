import React, { useRef, useState, useEffect } from "react"
import audioSrc from "../assets/sampleAudio2.mp3"

const initialCaptions = [
  {
    start: "00:00:00.490",
    end: "00:00:02.530",
    text: "Arthur the Rat read by Brian Goggin from",
  },
  {
    start: "00:00:02.530",
    end: "00:00:05.550",
    text: "Ireland Once there was a young rat named",
  },
  {
    start: "00:00:05.550",
    end: "00:00:06.470",
    text: "Arthur who could never make up his mind.",
  },
  {
    start: "00:00:06.690",
    end: "00:00:08.230",
    text: "Whenever his friends asked him if he would",
  },
  {
    start: "00:00:08.230",
    end: "00:00:09.570",
    text: "like to go out with them, he would",
  },
  {
    start: "00:00:09.570",
    end: "00:00:10.690",
    text: "only answer, I don't know.",
  },
  {
    start: "00:00:10.990",
    end: "00:00:12.570",
    text: "He wouldn't say yes or no, either.",
  },
  {
    start: "00:00:12.690",
    end: "00:00:14.290",
    text: "He would always shirk, making a choice.",
  },
  {
    start: "00:00:14.290",
    end: "00:00:21.930",
    text: "His aunt Helen said to him, Now look here, no one is going to care for you if you carry on like this. You have no more mind than a bade of grass.",
  },
  {
    start: "00:00:21.930",
    end: "00:00:23.530",
    text: "One rainy day the rats heard a great",
  },
  {
    start: "00:00:23.530",
    end: "00:00:32.090",
    text: "noise in the loft. The pine rafters were all rotten, so the barn was rather unsafe. At last the joists gave way and fell to the ground. The walls shook and all the rats' hair",
  },
  {
    start: "00:00:32.090",
    end: "00:00:43.430",
    text: "stood on end with fear and horror. This won't do, said the captain. I'll send out scouts to search for a new home. Within five hours the ten scouts came back and said, We found a stone house where there is room and board for us all.",
  },
  {
    start: "00:00:44.010",
    end: "00:01:00.150",
    text: "There is a kindly horse named Nelly, a cow, a calf and a garden with an elm tree. The rats crawled out of their little houses and stood on the floor in a long line. Just then the old one saw Arthur. Stop, he ordered coarsely. You are coming, of course. I am not certain, said Arthur undaunted. The roof may not come down yet.",
  },
  {
    start: "00:01:00.710",
    end: "00:01:02.330",
    text: "Well, said the angry old rat, we can't",
  },
  {
    start: "00:01:02.330",
    end: "00:01:03.250",
    text: "wait for you to join us.",
  },
  {
    start: "00:01:03.410",
    end: "00:01:04.510",
    text: "Right about face! March!",
  },
  {
    start: "00:01:05.270",
    end: "00:01:09.630",
    text: "Arthur stood and watched them hurry away. I think I'll go tomorrow, he calmly said to himself. But then again, I don't know. It's so nice and snug here.",
  },
  {
    start: "00:01:10.850",
    end: "00:01:21.590",
    text: "That night there was a big crash. In the morning some men with some boys and girls rode up and looked at the barn. One of them moved aboard and he saw a young rat, quite dead, half in and half out of his hole. Thus the shirker got his due.",
  },
]

export const AudioTranscript = () => {
  const audioRef = useRef()
  const [captions, setCaptions] = useState([])
  const [currentCaption, setCurrentCaption] = useState("")

  useEffect(() => {
    const parsedCaptions = initialCaptions.map((caption, index) => ({
      ...caption,
      start: parseTime(caption.start),
      end: parseTime(caption.end),
      id: index,
    }))
    setCaptions(parsedCaptions)
    console.log("captions", captions)
  }, [])

  console.log("captions", captions)
  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime
      const activeCaption = captions.find(
        (caption) => currentTime >= caption.start && currentTime <= caption.end
      )

      if (activeCaption) {
        setCurrentCaption(activeCaption.text)
        scrollToCaption(activeCaption.id)
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [captions])

  // converting in seconds
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number)
    const [secs, millisecs] = seconds.toString().split(".").map(Number)
    return hours * 3600 + minutes * 60 + secs + millisecs / 1000
  }

  const scrollToCaption = (id) => {
    const element = document.getElementById(`caption-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }

  const handleCaptionClick = (startTime) => {
    const audio = audioRef.current
    audio.currentTime = startTime
    audio.play()
  }

  const formatDurationFromSeconds = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = Math.floor(totalSeconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
      <div className="transcript">
        {captions.map((caption) => (
          <div
            key={caption.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "10px" }}>
              {formatDurationFromSeconds(caption.start)}
            </span>
            <p
              id={`caption-${caption.id}`}
              style={{ cursor: "pointer" }}
              className={currentCaption === caption.text ? "highlight" : ""}
              onClick={() => handleCaptionClick(caption.start)}
            >
              {caption.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AudioTranscript
