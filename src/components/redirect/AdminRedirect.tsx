import { useEffect } from 'react';

const AdminRedirect = () => {
  useEffect(() => {
    // Redirect to admin dashboard
    window.location.href = 'https://amritha-heritage-admin-dashboard-e1.vercel.app/';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-primary mx-auto mb-4"></div>
        <p className="text-foreground-subtle font-cormorant text-lg">
          Redirecting to Admin Dashboard...
        </p>
      </div>
    </div>
  );
};

export default AdminRedirect;