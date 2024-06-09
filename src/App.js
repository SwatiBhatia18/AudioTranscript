import React from 'react';
import AudioTranscript from './components/AudioTranscript';
import './App.css';

function App() {
  const audioSrc = './assets/sampleAudio.mp3'; // Replace with the path to your audio file
  const vttSrc = 'path/to/your/captions/file.vtt'; // Replace with the path to your VTT file

  return (
    <div className="App">
      <h1>Audio Transcript</h1>
      <AudioTranscript audioSrc={audioSrc}  />
    </div>
  );
}

export default App;
