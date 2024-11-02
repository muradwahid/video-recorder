import React from 'react';
import { ILocalVideoTrack, IRemoteUser } from 'agora-rtc-sdk-ng';
import { Camera } from 'lucide-react';

interface VideoGridProps {
  localVideoTrack: ILocalVideoTrack | null;
  remoteUsers: IRemoteUser[];
  isVideoEnabled: boolean;
}

function VideoGrid({ localVideoTrack, remoteUsers, isVideoEnabled }: VideoGridProps) {
  const calculateLayout = () => {
    const totalParticipants = remoteUsers.length + 1;
    if (totalParticipants === 1) return 'grid-cols-1';
    if (totalParticipants === 2) return 'grid-cols-2';
    if (totalParticipants <= 4) return 'grid-cols-2';
    if (totalParticipants <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className={`grid ${calculateLayout()} gap-4 p-4 h-full`}>
      <div className="relative bg-gray-800 rounded-lg overflow-hidden">
        {isVideoEnabled && localVideoTrack ? (
          <div className="video-player" ref={(ref) => ref && localVideoTrack.play(ref)} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
          You
        </div>
      </div>

      {remoteUsers.map((user) => (
        <div key={user.uid} className="relative bg-gray-800 rounded-lg overflow-hidden">
          {user.videoTrack ? (
            <div
              className="video-player"
              ref={(ref) => ref && user.videoTrack?.play(ref)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Camera className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-2 py-1 rounded text-white">
            {user.uid}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;