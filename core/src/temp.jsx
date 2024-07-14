// // import React, { useEffect, useRef } from 'react';

// // export default function Godot() {
// //     const canvasRef = useRef(null);
// //     const statusProgressRef = useRef(null);
// //     const statusProgressInnerRef = useRef(null);
// //     const statusIndeterminateRef = useRef(null);
// //     const statusNoticeRef = useRef(null);

// //     useEffect(() => {
// //         let GODOT_CONFIG = {
// //             "args": [],
// //             "canvasResizePolicy": 2,
// //             "executable": "index",
// //             "experimentalVK": false,
// //             "fileSizes": {"index.pck": 26189216, "index.wasm": 49282035},
// //             "focusCanvas": true,
// //             "gdextensionLibs": []
// //         };
// //         // let GODOT_CONFIG = {
// //         //     "args": [],
// //         //     "canvasResizePolicy": 2,
// //         //     "executable": "index",
// //         //     "experimentalVK": false,
// //         //     "focusCanvas": true,
// //         //     "gdextensionLibs": []
// //         // };
// //         const loadPck = async () => {
// //             try {
// //               const response = await fetch('/index.pck');
// //               if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //               const arrayBuffer = await response.arrayBuffer();
              
// //                GODOT_CONFIG = {
// //                 // ... other config options ...
// //                 pckData: new Uint8Array(arrayBuffer),
// //               };
        
// //             //   const engine = new window.Engine(GODOT_CONFIG);
// //               // Initialize game with this engine instance
// //             } catch (e) {
// //               console.error('Failed to load .pck file:', e);
// //             }
// //           };
        
// //           loadPck();
        
        
        

// //         const initGame = async () => {
// //             console.log('Initializing game...');
// //             if (typeof window.Engine === 'undefined') {
// //                 console.error('Godot Engine is not loaded');
// //                 return;
// //             }
// //             console.log('Engine found, creating instance...');
// //             const engine = new window.Engine(GODOT_CONFIG);
// //             console.log('Engine instance created, starting game...');

// //             const INDETERMINATE_STATUS_STEP_MS = 100;
// //             const statusProgress = statusProgressRef.current;
// //             const statusProgressInner = statusProgressInnerRef.current;
// //             const statusIndeterminate = statusIndeterminateRef.current;
// //             const statusNotice = statusNoticeRef.current;

// //             let initializing = true;
// //             let statusMode = 'hidden';

// //             let animationCallbacks = [];
// //             function animate(time) {
// //                 animationCallbacks.forEach((callback) => callback(time));
// //                 requestAnimationFrame(animate);
// //             }
// //             requestAnimationFrame(animate);

// //             function animateStatusIndeterminate(ms) {
// //                 const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
// //                 if (statusIndeterminate.children[i].style.borderTopColor === '') {
// //                     Array.prototype.slice.call(statusIndeterminate.children).forEach((child) => {
// //                         child.style.borderTopColor = '';
// //                     });
// //                     statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
// //                 }
// //             }

// //             function setStatusMode(mode) {
// //                 if (statusMode === mode || !initializing) {
// //                     return;
// //                 }
// //                 [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
// //                     elem.style.display = 'none';
// //                 });
// //                 animationCallbacks = animationCallbacks.filter(function (value) {
// //                     return (value !== animateStatusIndeterminate);
// //                 });
// //                 switch (mode) {
// //                     case 'progress':
// //                         statusProgress.style.display = 'block';
// //                         break;
// //                     case 'indeterminate':
// //                         statusIndeterminate.style.display = 'block';
// //                         animationCallbacks.push(animateStatusIndeterminate);
// //                         break;
// //                     case 'notice':
// //                         statusNotice.style.display = 'block';
// //                         break;
// //                     case 'hidden':
// //                         break;
// //                     default:
// //                         throw new Error('Invalid status mode');
// //                 }
// //                 statusMode = mode;
// //             }

// //             function setStatusNotice(text) {
// //                 while (statusNotice.lastChild) {
// //                     statusNotice.removeChild(statusNotice.lastChild);
// //                 }
// //                 const lines = text.split('\n');
// //                 lines.forEach((line) => {
// //                     statusNotice.appendChild(document.createTextNode(line));
// //                     statusNotice.appendChild(document.createElement('br'));
// //                 });
// //             }

// //             function displayFailureNotice(err) {
// //                 const msg = err.message || err;
// //                 console.error(msg);
// //                 setStatusNotice(msg);
// //                 setStatusMode('notice');
// //                 initializing = false;
// //             }

// //             const missing = window.Engine.getMissingFeatures();
// //             if (missing.length !== 0) {
// //                 const missingMsg = 'Error\nThe following features required to run Godot projects on the Web are missing:\n';
// //                 displayFailureNotice(missingMsg + missing.join('\n'));
// //             } else {
// //                 setStatusMode('indeterminate');
// //                 engine.startGame({
// //                     'onProgress': function (current, total) {
// //         if (total > 0) {
// //             statusProgressInner.style.width = `${(current / total) * 100}%`;
// //             setStatusMode('progress');
// //             if (current === total) {
// //                 setTimeout(() => {
// //                     setStatusMode('indeterminate');
// //                 }, 500);
// //             }
// //         } else {
// //             setStatusMode('indeterminate');
// //         }
// //     },
// //     'onPrintError': function(err) {
// //         console.error(err);
// //     },
// //                 }).then(() => {
// //                     setStatusMode('hidden');
// //                     initializing = false;
// //                 }, displayFailureNotice);
// //             }
// //         };

// //         if (document.readyState === 'complete') {
// //             console.log('Document ready, initializing game immediately');
// //             initGame();
// //         } else {
// //             console.log('Document not ready, waiting for load event');
// //             window.addEventListener('load', initGame);
// //         }
// //     }, []);

// //     return (
// //         <div id="game-container">
// //             <canvas ref={canvasRef} id="canvas">
// //                 HTML5 canvas appears to be unsupported in the current browser.<br />
// //                 Please try updating or use a different browser.
// //             </canvas>
// //             <div id="status-container">
// //                 <div 
// //                     ref={statusProgressRef} 
// //                     id="status-progress" 
// //                     style={{display: 'none'}}
// //                 >
// //                     <div ref={statusProgressInnerRef} id="status-progress-inner"></div>
// //                 </div>
// //                 <div 
// //                     ref={statusIndeterminateRef} 
// //                     id="status-indeterminate" 
// //                     style={{display: 'none'}}
// //                 >
// //                     <div className="indeterminate-progress-box">
// //                         <div className="indeterminate-progress-div"></div>
// //                     </div>
// //                 </div>
// //                 <div ref={statusNoticeRef} id="status-notice" className="godot" style={{display: 'none'}}></div>
// //             </div>
// //         </div>
// //     );
// // }

// import React, { useEffect, useRef } from 'react';

// export default function Godot() {
//     const canvasRef = useRef(null);
//     const statusProgressRef = useRef(null);
//     const statusProgressInnerRef = useRef(null);
//     const statusIndeterminateRef = useRef(null);
//     const statusNoticeRef = useRef(null);

//     useEffect(() => {
//         let GODOT_CONFIG = {
//             "args": [],
//             "canvasResizePolicy": 2,
//             "executable": "index",
//             "experimentalVK": false,
//             "fileSizes": {"index.pck": 26189216, "index.wasm": 49282035},
//             "focusCanvas": true,
//             "gdextensionLibs": []
//         };

//         const loadPck = async () => {
//             try {
//                 const response = await fetch(`/index.pck?cache-bust=${new Date().getTime()}`);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const arrayBuffer = await response.arrayBuffer();
//                 GODOT_CONFIG.pckData = new Uint8Array(arrayBuffer);
//                 return true;
//             } catch (e) {
//                 console.error('Failed to load .pck file:', e);
//                 return false;
//             }
//         };

//         const initGame = async (retryCount = 3) => {
//             console.log('Initializing game...');
//             if (typeof window.Engine === 'undefined') {
//                 console.error('Godot Engine is not loaded');
//                 if (retryCount > 0) {
//                     console.log(`Retrying to load Godot engine... (${3 - retryCount + 1}/3)`);
//                     setTimeout(() => initGame(retryCount - 1), 1000);
//                 }
//                 return;
//             }
//             console.log('Engine found, creating instance...');
//             const engine = new window.Engine(GODOT_CONFIG);
//             console.log('Engine instance created, starting game...');

//             const INDETERMINATE_STATUS_STEP_MS = 100;
//             const statusProgress = statusProgressRef.current;
//             const statusProgressInner = statusProgressInnerRef.current;
//             const statusIndeterminate = statusIndeterminateRef.current;
//             const statusNotice = statusNoticeRef.current;

//             let initializing = true;
//             let statusMode = 'hidden';

//             let animationCallbacks = [];
//             function animate(time) {
//                 animationCallbacks.forEach((callback) => callback(time));
//                 requestAnimationFrame(animate);
//             }
//             requestAnimationFrame(animate);

//             function animateStatusIndeterminate(ms) {
//                 const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
//                 if (statusIndeterminate.children[i].style.borderTopColor === '') {
//                     Array.prototype.slice.call(statusIndeterminate.children).forEach((child) => {
//                         child.style.borderTopColor = '';
//                     });
//                     statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
//                 }
//             }

//             function setStatusMode(mode) {
//                 if (statusMode === mode || !initializing) {
//                     return;
//                 }
//                 [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
//                     elem.style.display = 'none';
//                 });
//                 animationCallbacks = animationCallbacks.filter(function (value) {
//                     return (value !== animateStatusIndeterminate);
//                 });
//                 switch (mode) {
//                     case 'progress':
//                         statusProgress.style.display = 'block';
//                         break;
//                     case 'indeterminate':
//                         statusIndeterminate.style.display = 'block';
//                         animationCallbacks.push(animateStatusIndeterminate);
//                         break;
//                     case 'notice':
//                         statusNotice.style.display = 'block';
//                         break;
//                     case 'hidden':
//                         break;
//                     default:
//                         throw new Error('Invalid status mode');
//                 }
//                 statusMode = mode;
//             }

//             function setStatusNotice(text) {
//                 while (statusNotice.lastChild) {
//                     statusNotice.removeChild(statusNotice.lastChild);
//                 }
//                 const lines = text.split('\n');
//                 lines.forEach((line) => {
//                     statusNotice.appendChild(document.createTextNode(line));
//                     statusNotice.appendChild(document.createElement('br'));
//                 });
//             }

//             function displayFailureNotice(err) {
//                 const msg = err.message || err;
//                 console.error(msg);
//                 setStatusNotice(msg);
//                 setStatusMode('notice');
//                 initializing = false;
//             }

//             const missing = window.Engine.getMissingFeatures();
//             if (missing.length !== 0) {
//                 const missingMsg = 'Error\nThe following features required to run Godot projects on the Web are missing:\n';
//                 displayFailureNotice(missingMsg + missing.join('\n'));
//             } else {
//                 setStatusMode('indeterminate');
//                 engine.startGame({
//                     'onProgress': function (current, total) {
//                         if (total > 0) {
//                             statusProgressInner.style.width = `${(current / total) * 100}%`;
//                             setStatusMode('progress');
//                             if (current === total) {
//                                 setTimeout(() => {
//                                     setStatusMode('indeterminate');
//                                 }, 500);
//                             }
//                         } else {
//                             setStatusMode('indeterminate');
//                         }
//                     },
//                     'onPrintError': function(err) {
//                         console.error(err);
//                     },
//                 }).then(() => {
//                     setStatusMode('hidden');
//                     initializing = false;
//                 }, (err) => {
//                     console.error('Game start failed:', err);
//                     if (retryCount > 0) {
//                         console.log(`Retrying to start game... (${3 - retryCount + 1}/3)`);
//                         setTimeout(() => initGame(retryCount - 1), 1000);
//                     } else {
//                         displayFailureNotice(err);
//                     }
//                 });
//             }
//         };

//         if (document.readyState === 'complete') {
//             console.log('Document ready, initializing game immediately');
//             loadPck().then(success => {
//                 if (success) {
//                     initGame();
//                 } else {
//                     console.error('Failed to load .pck file after multiple attempts.');
//                 }
//             });
//         } else {
//             console.log('Document not ready, waiting for load event');
//             window.addEventListener('load', () => {
//                 loadPck().then(success => {
//                     if (success) {
//                         initGame();
//                     } else {
//                         console.error('Failed to load .pck file after multiple attempts.');
//                     }
//                 });
//             });
//         }
//     }, []);

//     return (
//         <div id="game-container">
//             <canvas ref={canvasRef} id="canvas">
//                 HTML5 canvas appears to be unsupported in the current browser.<br />
//                 Please try updating or use a different browser.
//             </canvas>
//             <div id="status-container">
//                 <div 
//                     ref={statusProgressRef} 
//                     id="status-progress" 
//                     style={{display: 'none'}}
//                 >
//                     <div ref={statusProgressInnerRef} id="status-progress-inner"></div>
//                 </div>
//                 <div 
//                     ref={statusIndeterminateRef} 
//                     id="status-indeterminate" 
//                     style={{display: 'none'}}
//                 >
//                     <div className="indeterminate-progress-box">
//                         <div className="indeterminate-progress-div"></div>
//                     </div>
//                 </div>
//                 <div ref={statusNoticeRef} id="status-notice" className="godot" style={{display: 'none'}}></div>
//             </div>
//         </div>
//     );
// }
// import React, { useEffect, useRef } from 'react';

// export default function Godot() {
//     const canvasRef = useRef(null);
//     const statusProgressRef = useRef(null);
//     const statusProgressInnerRef = useRef(null);
//     const statusIndeterminateRef = useRef(null);
//     const statusNoticeRef = useRef(null);

//     useEffect(() => {
//         let GODOT_CONFIG = {
//             "args": [],
//             "canvasResizePolicy": 2,
//             "executable": "index",
//             "experimentalVK": false,
//             "fileSizes": {"index.pck": 26189216, "index.wasm": 49282035},
//             "focusCanvas": true,
//             "gdextensionLibs": []
//         };

//         const loadPck = async (retryCount = 3, retryDelay = 1000) => {
//             for (let attempt = 0; attempt < retryCount; attempt++) {
//                 try {
//                     const response = await fetch(`/index.pck`);
//                     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                     const arrayBuffer = await response.arrayBuffer();
//                     // GODOT_CONFIG.pckData = new Uint8Array(arrayBuffer);
//                     return true;
//                 } catch (e) {
//                     console.error(`Failed to load .pck file on attempt ${attempt + 1} of ${retryCount}:`, e);
//                     if (attempt < retryCount - 1) {
//                         await new Promise(resolve => setTimeout(resolve, retryDelay));
//                     }
//                 }
//             }
//             return false;
//         };

//         const initGame = async (retryCount = 3) => {
//             console.log('Initializing game...');
//             if (typeof window.Engine === 'undefined') {
//                 console.error('Godot Engine is not loaded');
//                 if (retryCount > 0) {
//                     console.log(`Retrying to load Godot engine... (${3 - retryCount + 1}/3)`);
//                     setTimeout(() => initGame(retryCount - 1), 1000);
//                 }
//                 return;
//             }
//             console.log('Engine found, creating instance...');
//             const engine = new window.Engine(GODOT_CONFIG);
//             console.log('Engine instance created, starting game...');

//             const INDETERMINATE_STATUS_STEP_MS = 100;
//             const statusProgress = statusProgressRef.current;
//             const statusProgressInner = statusProgressInnerRef.current;
//             const statusIndeterminate = statusIndeterminateRef.current;
//             const statusNotice = statusNoticeRef.current;

//             let initializing = true;
//             let statusMode = 'hidden';

//             let animationCallbacks = [];
//             function animate(time) {
//                 animationCallbacks.forEach((callback) => callback(time));
//                 requestAnimationFrame(animate);
//             }
//             requestAnimationFrame(animate);

//             function animateStatusIndeterminate(ms) {
//                 const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
//                 if (statusIndeterminate.children[i].style.borderTopColor === '') {
//                     Array.prototype.slice.call(statusIndeterminate.children).forEach((child) => {
//                         child.style.borderTopColor = '';
//                     });
//                     statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
//                 }
//             }

//             function setStatusMode(mode) {
//                 if (statusMode === mode || !initializing) {
//                     return;
//                 }
//                 [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
//                     elem.style.display = 'none';
//                 });
//                 animationCallbacks = animationCallbacks.filter(function (value) {
//                     return (value !== animateStatusIndeterminate);
//                 });
//                 switch (mode) {
//                     case 'progress':
//                         statusProgress.style.display = 'block';
//                         break;
//                     case 'indeterminate':
//                         statusIndeterminate.style.display = 'block';
//                         animationCallbacks.push(animateStatusIndeterminate);
//                         break;
//                     case 'notice':
//                         statusNotice.style.display = 'block';
//                         break;
//                     case 'hidden':
//                         break;
//                     default:
//                         throw new Error('Invalid status mode');
//                 }
//                 statusMode = mode;
//             }

//             function setStatusNotice(text) {
//                 while (statusNotice.lastChild) {
//                     statusNotice.removeChild(statusNotice.lastChild);
//                 }
//                 const lines = text.split('\n');
//                 lines.forEach((line) => {
//                     statusNotice.appendChild(document.createTextNode(line));
//                     statusNotice.appendChild(document.createElement('br'));
//                 });
//             }

//             function displayFailureNotice(err) {
//                 const msg = err.message || err;
//                 console.error(msg);
//                 setStatusNotice(msg);
//                 setStatusMode('notice');
//                 initializing = false;
//             }

//             const missing = window.Engine.getMissingFeatures();
//             if (missing.length !== 0) {
//                 const missingMsg = 'Error\nThe following features required to run Godot projects on the Web are missing:\n';
//                 displayFailureNotice(missingMsg + missing.join('\n'));
//             } else {
//                 setStatusMode('indeterminate');
//                 engine.startGame({
//                     'onProgress': function (current, total) {
//                         if (total > 0) {
//                             statusProgressInner.style.width = `${(current / total) * 100}%`;
//                             setStatusMode('progress');
//                             if (current === total) {
//                                 setTimeout(() => {
//                                     setStatusMode('indeterminate');
//                                 }, 500);
//                             }
//                         } else {
//                             setStatusMode('indeterminate');
//                         }
//                     },
//                     'onPrintError': function(err) {
//                         console.error(err);
//                     },
//                 }).then(() => {
//                     setStatusMode('hidden');
//                     initializing = false;
//                 }, (err) => {
//                     console.error('Game start failed:', err);
//                     if (retryCount > 0) {
//                         console.log(`Retrying to start game... (${3 - retryCount + 1}/3)`);
//                         setTimeout(() => initGame(retryCount - 1), 1000);
//                     } else {
//                         displayFailureNotice(err);
//                     }
//                 });
//             }
//         };

//         if (document.readyState === 'complete') {
//             console.log('Document ready, initializing game immediately');
//             loadPck().then(success => {
//                 if (success) {
//                     initGame();
//                 } else {
//                     console.error('Failed to load .pck file after multiple attempts.');
//                 }
//             });
//         } else {
//             console.log('Document not ready, waiting for load event');
//             window.addEventListener('load', () => {
//                 loadPck().then(success => {
//                     if (success) {
//                         initGame();
//                     } else {
//                         console.error('Failed to load .pck file after multiple attempts.');
//                     }
//                 });
//             });
//         }
//     }, []);

//     return (
//         <div id="game-container">
//             <canvas ref={canvasRef} id="canvas">
//                 HTML5 canvas appears to be unsupported in the current browser.<br />
//                 Please try updating or use a different browser.
//             </canvas>
//             <div id="status-container">
//                 <div 
//                     ref={statusProgressRef} 
//                     id="status-progress" 
//                     style={{display: 'none'}}
//                 >
//                     <div ref={statusProgressInnerRef} id="status-progress-inner"></div>
//                 </div>
//                 <div 
//                     ref={statusIndeterminateRef} 
//                     id="status-indeterminate" 
//                     style={{display: 'none'}}
//                 >
//                     <div className="indeterminate-progress-box">
//                         <div className="indeterminate-progress-div"></div>
//                     </div>
//                 </div>
//                 <div ref={statusNoticeRef} id="status-notice" className="godot" style={{display: 'none'}}></div>
//             </div>
//         </div>
//     );
// }