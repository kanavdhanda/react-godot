import { useEffect, useRef } from 'react';

const GodotGame = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.setAttribute('allow', 'cross-origin-isolated');
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/index.html"
      title="Godot Game"
      width="1400"
      height="680"
      style={{ border: 'none' }}
    />
  );
};

export default GodotGame;