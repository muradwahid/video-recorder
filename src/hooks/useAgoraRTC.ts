import { useState, useEffect } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from 'agora-rtc-sdk-ng';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

export function useAgoraRTC() {
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  useEffect(() => {
    const handleUserPublished = async (user: any, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      setRemoteUsers((prevUsers) => {
        return prevUsers.map((User) => {
          if (User.uid === user.uid) {
            return user;
          }
          return User;
        });
      });
    };

    const handleUserUnpublished = (user: any) => {
      setRemoteUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    };

    const handleUserJoined = (user: any) => {
      setRemoteUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeft = (user: any) => {
      setRemoteUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  const joinChannel = async (channelName: string, uid: string) => {
    try {
      await client.join(
        import.meta.env.VITE_AGORA_APP_ID || '',
        channelName,
        null,
        uid
      );

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();

      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);

      await client.publish([audioTrack, videoTrack]);
    } catch (error) {
      console.error('Error joining channel:', error);
    }
  };

  const leaveChannel = async () => {
    localAudioTrack?.close();
    localVideoTrack?.close();
    await client.leave();
    setLocalAudioTrack(null);
    setLocalVideoTrack(null);
    setRemoteUsers([]);
  };

  const toggleAudio = () => {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!localAudioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!localVideoTrack.enabled);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      if (localVideoTrack) {
        await client.unpublish(localVideoTrack);
      }
      await client.publish(screenTrack);
      setLocalVideoTrack(screenTrack as ILocalVideoTrack);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenShare = async () => {
    if (localVideoTrack) {
      await client.unpublish(localVideoTrack);
      localVideoTrack.close();
      const newVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await client.publish(newVideoTrack);
      setLocalVideoTrack(newVideoTrack);
    }
  };

  return {
    localAudioTrack,
    localVideoTrack,
    remoteUsers,
    joinChannel,
    leaveChannel,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
  };
}