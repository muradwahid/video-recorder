import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Video, Users, Shield } from 'lucide-react';

function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const createRoom = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Connect with anyone, anywhere
        </h1>
        <p className="text-xl text-muted-foreground">
          High-quality video calls with advanced features for seamless communication
        </p>
        <button
          onClick={createRoom}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90"
        >
          Start a Meeting
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-card rounded-lg">
            <Video className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">HD Video Calls</h3>
            <p className="text-muted-foreground">
              Crystal clear video quality for face-to-face conversations
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Group Meetings</h3>
            <p className="text-muted-foreground">
              Host meetings with multiple participants seamlessly
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Calls</h3>
            <p className="text-muted-foreground">
              End-to-end encryption for your privacy and security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;