import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth0();

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div>
          <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;