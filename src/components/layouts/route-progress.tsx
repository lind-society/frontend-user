import * as React from 'react';
import { useLocation } from 'react-router';

/** Thin bronze bar that sweeps across the top of the page on navigation. */
export default function RouteProgress() {
  const location = useLocation();
  const isFirstRender = React.useRef(true);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 450);
    return () => window.clearTimeout(timer);
  }, [location.key]);

  if (!visible) return null;

  return (
    <div
      key={location.key}
      aria-hidden
      className='pointer-events-none fixed inset-x-0 top-0 z-[1600] h-[3px] origin-left animate-route-progress bg-[#A2754C]'
    />
  );
}
