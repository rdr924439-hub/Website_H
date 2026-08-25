import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Route = { path: string; params: Record<string, string> };

const RouterContext = createContext<{
  route: Route;
  navigate: (path: string) => void;
} | null>(null);

function parsePath(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const segments = hash.split('/').filter(Boolean);
  if (segments.length === 0) return { path: '/', params: {} };
  if (segments.length === 1) return { path: '/' + segments[0], params: {} };
  // e.g. /news/some-slug
  if (segments[0] === 'news') return { path: '/news/:slug', params: { slug: segments[1] } };
  if (segments[0] === 'events') return { path: '/events/:slug', params: { slug: segments[1] } };
  return { path: '/' + segments.join('/'), params: {} };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parsePath);

  useEffect(() => {
    const onHash = () => {
      setRoute(parsePath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { navigate } = useRouter();
  return (
    <a
      href={'#' + to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
