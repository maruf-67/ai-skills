'use client';

import { useAuth } from '@/contexts';

export function AuthGateExample() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading session...</p>;
  if (!user) return <p>Please sign in.</p>;

  return (
    <div className="space-y-2">
      <p className="text-sm">Signed in as {user.email}</p>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
}
