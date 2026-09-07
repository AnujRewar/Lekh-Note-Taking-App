import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { saveCanvasToDrive, loadCanvasFromDrive } from "../../utils/googleDriveSync.js";

export default function NoteCanvas() {
    const { id } = useParams(); // Unique note/canvas ID
    const [editorInstance, setEditorInstance] = useState(null);
    const [canvasContent, setCanvasContent] = useState(null);
    const [driveToken, setDriveToken] = useState(localStorage.getItem("google_drive_token"));
    const [syncStatus, setSyncStatus] = useState("Synced");

    const fileName = `notebook_note_${id}.json`;
    const fileIdStorageKey = `drive_file_id_${id}`;
    const [fileId, setFileId] = useState(localStorage.getItem(fileIdStorageKey));

    const contentRef = useRef(canvasContent);
    contentRef.current = canvasContent;

    // 1. Function to trigger Google Identity Services popup for Drive scope
    const requestDriveAccess = () => {
        /* global google */
        if (window.google && window.google.accounts && window.google.accounts.oauth2) {
            triggerTokenClient();
            return;
        }
        // If not loaded yet, inject the script dynamically
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Script loaded successfully, now trigger the token client
            triggerTokenClient();

        };
        script.onerror = () => {
            alert("Failed to load Google authentication script. Check your internet connection.");
        };
        document.body.appendChild(script);
    };
        const triggerTokenClient = () => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, //  GOOGLE CLIENT ID
                scope: "https://www.googleapis.com/auth/drive.appdata",
                callback: (tokenResponse) => {
                    if (tokenResponse && tokenResponse.access_token) {
                        localStorage.setItem("google_drive_token", tokenResponse.access_token);
                        setDriveToken(tokenResponse.access_token);
                    }
                },
            });

            client.requestAccessToken();
        };


    // 2. Fetch note from Google Drive when editor mounts & token is present
    useEffect(() => {
        const fetchNoteFromDrive = async () => {
            if (!driveToken || !editorInstance) return;
            try {
                setSyncStatus("Loading from Drive...");
                const result = await loadCanvasFromDrive(driveToken, fileName);
                if (result.fileId) {
                    setFileId(result.fileId);
                    localStorage.setItem(fileIdStorageKey, result.fileId);
                }
                if (result.content) {
                    const parsedSnapshot = JSON.parse(result.content);
                    editorInstance.loadSnapshot(parsedSnapshot);
                }
                localStorage.setItem("isDriveConnected","yes");
                setSyncStatus("Synced");
            } catch (error) {
                console.error("Failed to load from Google Drive:", error);

                // If token is expired or unauthorized, clear it to force re-auth
                if (error.message?.includes('401') || error.message?.includes('403') || error.status === 401) {
                    localStorage.removeItem("google_drive_token");
                    setDriveToken(null);
                    setSyncStatus("Session expired. Please re-authorize.");
                } else {
                    setSyncStatus("Load failed");
                }
            }
        };

        fetchNoteFromDrive();
    }, [driveToken, editorInstance, id]);

    // 3. Debounced Auto-Save to Google Drive
    useEffect(() => {
        if (!driveToken) return;

        const autoSaveTimer = setTimeout(async () => {
            if (contentRef.current) {
                try {
                    setSyncStatus("Saving to Drive...");
                    const response = await saveCanvasToDrive(driveToken, fileId, contentRef.current, fileName);

                    if (response && response.id && !fileId) {
                        setFileId(response.id);
                        localStorage.setItem(fileIdStorageKey, response.id);
                    }
                    setSyncStatus("Saved to Google Drive!");
                } catch (error) {
                    console.error("Auto-save failed:", error);

                    if (error.message?.includes('401') || error.message?.includes('403') || error.status === 401) {
                        localStorage.removeItem("google_drive_token");
                        setDriveToken(null);
                        setSyncStatus("Session expired. Re-auth required.");
                    } else {
                        setSyncStatus("Sync error");
                    }
                }
                }
        }, 1500); // Wait 1.5 seconds after user pauses drawing

        return () => clearTimeout(autoSaveTimer);
    }, [canvasContent, driveToken, fileId, fileName, fileIdStorageKey]);

    // 4. Watermark removal effect
    useEffect(() => {
        const interval = setInterval(() => {
            const selectors = ['.tl-watermark', '[class*="watermark"]', 'a[href*="tldraw.dev"]'];
            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => el.remove());
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // If user hasn't authorized Google Drive access yet, show a clean prompt screen
    if (!driveToken) {
        return (
            <div className="flex flex-col h-screen w-screen bg-zinc-950 text-white items-center justify-center gap-4">
                <h2 className="text-xl font-semibold">Google Drive Sync Required</h2>
                <p className="text-sm text-zinc-400 max-w-md text-center">
                    To auto-save your canvas notes securely into your own private Google Drive storage, please authorize access.
                </p>
                <button
                    onClick={requestDriveAccess}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                >
                    Authorize Google Drive Access
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Sync status indicator badge */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '180px',
                zIndex: 999,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none'
            }}>
                {syncStatus}
            </div>

            <Tldraw
                onMount={(editor) => {
                    setEditorInstance(editor);

                    editor.store.listen(() => {
                        const snapshot = editor.getSnapshot();
                        setCanvasContent(JSON.stringify(snapshot));
                    }, {
                        source: 'user',
                        scope: 'document',
                    });
                }}
            />
        </div>
    );
}