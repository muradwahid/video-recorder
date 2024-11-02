import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User, Mail, Calendar } from 'lucide-react';

function Profile() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="h-32 bg-primary"></div>
        <div className="p-6 -mt-16">
          <div className="flex items-end space-x-4">
            <img
              src={user?.picture}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-background"
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.nickname}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">
                  {new Date(user?.updated_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;