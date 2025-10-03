import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCustomLocation = () => {
  const router = useRouter();
  const [location, setLocation] = useState(router.asPath);

  useEffect(() => {
    const handleRouteChange = (url: string) => setLocation(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  const isConfig = location.includes('config');

  return { location, isConfig };
};
