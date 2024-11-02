import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare,
  Settings, Users, HandMetal, Phone, Maximize, MinimizeIcon
} from 'lucide-react';
import { useAgoraRTC } from '../hooks/useAgoraRTC';
import Chat from '../components/Chat';
import ParticipantList from '../components/ParticipantList';
import VideoGrid from '../components/VideoGrid';

function Room() {
  const { roomId } = useParams();
  const { user } = useAuth0();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);

  const {
    localAudioTrack,
    localVideoTrack,
    remoteUsers,
    joinChannel,
    leaveChannel,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
  } = useAgoraRTC();

  useEffect(() => {
    if (roomId && user) {
      joinChannel(roomId, user.sub);
    }
    return () => {
      leaveChannel();
    };
  }, [roomId, user]);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <VideoGrid
            localVideoTrack={localVideoTrack}
            remoteUsers={remoteUsers}
            isVideoEnabled={isVideoEnabled}
          />
        </div>
        
        <div className="h-20 bg-gray-800 flex items-center justify-center gap-4 px-4">
          <button
            onClick={() => {
              toggleAudio();
              setIsAudioEnabled(!isAudioEnabled);
            }}
            className={`p-4 rounded-full ${
              isAudioEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button
            onClick={() => {
              toggleVideo();
              setIsVideoEnabled(!isVideoEnabled);
            }}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          <button
            onClick={startScreenShare}
            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600"
          >
            <ScreenShare className="w-6 h-6" />
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-4 rounded-full ${
              showChat ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className={`p-4 rounded-full ${
              showParticipants ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <Users className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`p-4 rounded-full ${
              isHandRaised ? 'bg-yellow-500' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <HandMetal className="w-6 h-6" />
          </button>

          <button
            onClick={handleFullScreen}
            className="p-4 rounded-full bg-gray-600 hover:bg-gray-700"
          >
            {isFullScreen ? <MinimizeIcon className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
          </button>

          <button
            onClick={leaveChannel}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showChat && (
        <div className="w-80 bg-gray-800 border-l border-gray-700">
          <Chat roomId={roomId!} />
        </div>
      )}

      {showParticipants && (
        <div className="w-80 bg-gray-800 border-l border-gray-700">
          <ParticipantList users={remoteUsers} />
        </div>
      )}
    </div>
  );
}

export default Room;