import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="text-center space-y-6">
        <p className="text-6xl font-bold text-[var(--color-foreground)]">404</p>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-[var(--color-foreground)]">Page not found</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button variant="secondary">Back to home</Button>
        </Link>
      </div>
    </div>
  );
};
