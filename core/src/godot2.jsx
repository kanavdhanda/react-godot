import React, { useEffect, useRef, useState } from 'react';
import './godot.css';

export default function GGen(props) {
    const canvasRef = useRef(null);
    const statusProgressRef = useRef(null);
    const statusProgressInnerRef = useRef(null);
    const statusIndeterminateRef = useRef(null);
    const statusNoticeRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let engine = null;

        const fetchFile = async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.arrayBuffer();
        };

        const initGame = async () => {
            const GODOT_CONFIG = { ...props.gdConfig };

            try {
                // Wait for the Engine to be available
                await new Promise(resolve => {
                    const checkEngine = () => {
                        if (typeof window.Engine !== 'undefined') {
                            resolve();
                        } else {
                            setTimeout(checkEngine, 100);
                        }
                    };
                    checkEngine();
                });

                // Fetch .pck and .wasm files
                const [pckData, wasmData] = await Promise.all([
                    fetchFile(`/${GODOT_CONFIG.executable}.pck`),
                    fetchFile(`/${GODOT_CONFIG.executable}.wasm`)
                ]);

                // Set up the files object
                const files = [
                    { name: `/${GODOT_CONFIG.executable}.pck`, data: new Uint8Array(pckData) },
                    { name: `/${GODOT_CONFIG.executable}.wasm`, data: new Uint8Array(wasmData) }
                ];

                // Modify GODOT_CONFIG to include the files
                GODOT_CONFIG.files = files;

                // Set paths
                GODOT_CONFIG.mainPack = `/${GODOT_CONFIG.executable}.pck`;
                GODOT_CONFIG.wasmFile = `/${GODOT_CONFIG.executable}.wasm`;

                // Initialize Godot engine with the modified config
                engine = new window.Engine(GODOT_CONFIG);

                const INDETERMINATE_STATUS_STEP_MS = 100;
                const statusProgress = statusProgressRef.current;
                const statusProgressInner = statusProgressInnerRef.current;
                const statusIndeterminate = statusIndeterminateRef.current;
                const statusNotice = statusNoticeRef.current;

                let initializing = true;
                let statusMode = 'hidden';

                const setStatusMode = (mode) => {
                    if (statusMode === mode || !initializing) {
                        return;
                    }
                    [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
                        elem.style.display = 'none';
                    });
                    if (mode === 'progress') {
                        statusProgress.style.display = 'block';
                    } else if (mode === 'indeterminate') {
                        statusIndeterminate.style.display = 'block';
                    } else if (mode === 'notice') {
                        statusNotice.style.display = 'block';
                    }
                    statusMode = mode;
                };

                engine.startGame({
                    onProgress: (current, total) => {
                        if (total > 0) {
                            statusProgressInner.style.width = `${(current / total) * 100}%`;
                            setStatusMode('progress');
                            if (current === total) {
                                setStatusMode('indeterminate');
                            }
                        } else {
                            setStatusMode('indeterminate');
                        }
                    },
                }).then(() => {
                    setStatusMode('hidden');
                    initializing = false;
                    setIsLoading(false);
                }).catch((err) => {
                    console.error('Game start failed:', err);
                    setIsLoading(false);
                });

            } catch (error) {
                console.error('Failed to initialize game:', error);
                setIsLoading(false);
            }
        };

        initGame();

        return () => {
            if (engine) {
                console.log('Cleaning up Godot engine');
                engine.quit();
            }
        };
    }, [props.gdConfig]);

    // ... rest of the component remains the same


    // ... rest of the component remains the same


    return (
        <div className="godot-container" style={{ width: '500px', height: '500px', position: 'relative' }}>
            {isLoading && <div>Loading...</div>}
            <canvas
                ref={canvasRef}
                id="canvas"
                width="500px"
                height="500px"
                style={{ display: 'block' }}
            >
                HTML5 canvas appears to be unsupported in the current browser.<br />
                Please try updating or use a different browser.
            </canvas>
            <div id="status-container">
                <div
                    ref={statusProgressRef}
                    id="status-progress"
                    style={{ display: 'none' }}
                >
                    <div ref={statusProgressInnerRef} id="status-progress-inner"></div>
                </div>
                <div
                    ref={statusIndeterminateRef}
                    id="status-indeterminate"
                    style={{ display: 'none' }}
                >
                    <div className="indeterminate-progress-box">
                        <div className="indeterminate-progress-div"></div>
                    </div>
                </div>
                <div ref={statusNoticeRef} id="status-notice" className="godot" style={{ display: 'none' }}></div>
            </div>
        </div>
    );
}