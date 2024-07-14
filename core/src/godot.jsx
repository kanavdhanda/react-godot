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
      src="/docs/index.html"
      title="Godot Game"
      width="800"
      height="600"
      style={{ border: 'none' }}
    />
  );
};

export default GodotGame;