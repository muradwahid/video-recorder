import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Settings as SettingsIcon, Volume2, Camera, Monitor } from 'lucide-react';

function Settings() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Video</h2>
          </div>
          <select className="w-full p-2 rounded-md bg-background border border-input">
            <option>Default Camera</option>
          </select>
        </div>

        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Volume2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Audio</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Microphone</label>
              <select className="w-full p-2 rounded-md bg-background border border-input">
                <option>Default Microphone</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Speaker</label>
              <select className="w-full p-2 rounded-md bg-background border border-input">
                <option>Default Speaker</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Monitor className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Bandwidth</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Video Quality</label>
              <select className="w-full p-2 rounded-md bg-background border border-input">
                <option>Auto (Recommended)</option>
                <option>720p</option>
                <option>1080p</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;