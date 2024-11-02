import React from 'react';
import { IRemoteUser } from 'agora-rtc-sdk-ng';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface ParticipantListProps {
  users: IRemoteUser[];
}

function ParticipantList({ users }: ParticipantListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-2">
        <h2 className="text-lg font-semibold">Participants ({users.length + 1})</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">Y</span>
              </div>
              <span className="font-medium">You (Host)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-primary" />
              <Video className="w-4 h-4 text-primary" />
            </div>
          </div>

          {users.map((user) => (
            <div key={user.uid} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-medium">
                    {user.uid.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{user.uid}</span>
              </div>
              <div className="flex items-center space-x-2">
                {user.hasAudio ? (
                  <Mic className="w-4 h-4 text-primary" />
                ) : (
                  <MicOff className="w-4 h-4 text-muted-foreground" />
                )}
                {user.hasVideo ? (
                  <Video className="w-4 h-4 text-primary" />
                ) : (
                  <VideoOff className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParticipantList;