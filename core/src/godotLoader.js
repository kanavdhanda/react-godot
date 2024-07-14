const GODOT_CONFIG = {
    args: [],
    canvasResizePolicy: 2,
    executable: 'index',
    experimentalVK: false,
    fileSizes: {
        'index.pck': 26189216,
        'index.wasm': 49282035
    },
    focusCanvas: true,
    gdextensionLibs: []
};

let engineScriptLoaded = false;

const loadEngineScript = () => {
    return new Promise((resolve, reject) => {
        if (engineScriptLoaded) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = '/index.js';
        script.onload = () => {
            engineScriptLoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

export const loadGodotEngine = (progressCallback, canvas) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Starting to load engine script");
            await loadEngineScript();
            console.log("Engine script loaded");

            if (typeof window.Engine !== 'function') {
                throw new Error('Godot Engine not found after script load');
            }

            console.log("Creating engine instance");
            const engine = new window.Engine(GODOT_CONFIG);

            console.log("Initializing engine");
            await engine.init(canvas);
            console.log("Engine initialized");

            console.log("Preloading PCK file");
            await engine.preloadFile('/index.pck');
            console.log("PCK file preloaded");

            console.log("Starting game");
            engine.startGame();

            resolve();
        } catch (error) {
            console.error("Error in loadGodotEngine:", error);
            reject(error);
        }
    });
};