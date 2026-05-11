import React, { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import '../styles/video-player.css'

export default function VideoPlayer({ url = '', title = 'Video Player', onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgress = (state) => {
    setPlayed(state.played)
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleSeek = (e) => {
    const newPlayed = parseFloat(e.target.value)
    setPlayed(newPlayed)
    playerRef.current.seekTo(newPlayed)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen()
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen()
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = ('0' + date.getUTCSeconds()).slice(-2)
    if (hh) {
      return `${hh}:${('0' + mm).slice(-2)}:${ss}`
    }
    return `${mm}:${ss}`
  }

  return (
    <div className="video-player-wrapper" ref={containerRef}>
      <div className="video-player-container">
        <div className="video-player-main">
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={isPlaying}
            controls={false}
            width="100%"
            height="100%"
            volume={volume}
            muted={isMuted}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onPlayPause={handlePlayPause}
            progressInterval={500}
            pip={false}
          />
          
          {/* Custom controls overlay */}
          <div className="video-player-controls">
            {/* Progress bar */}
            <div className="video-progress-bar">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onChange={handleSeek}
                className="video-progress-input"
              />
              <div
                className="video-progress-fill"
                style={{ width: `${played * 100}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="video-controls-bottom">
              <div className="video-controls-left">
                <button
                  className="video-btn video-play-btn"
                  onClick={handlePlayPause}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <div className="video-volume-control">
                  <button
                    className="video-btn video-mute-btn"
                    onClick={toggleMute}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="video-volume-slider"
                  />
                </div>

                <span className="video-time-display">
                  {formatTime(played * duration)} / {formatTime(duration)}
                </span>
              </div>

              <div className="video-controls-right">
                <button
                  className="video-btn video-fullscreen-btn"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? '⛶' : '⛶'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info section */}
        {title && (
          <div className="video-info">
            <h3 className="video-title">{title}</h3>
            <p className="video-url-hint">
              Supports YouTube, Instagram, and other major video platforms
            </p>
          </div>
        )}

        {/* Close button */}
        {onClose && (
          <button className="video-close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
