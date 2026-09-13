import React, { useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Quickdraw } from "@quickdrawjs/react";
import "@quickdrawjs/core/quickdraw.css";
import { saveCanvasToDrive, loadCanvasFromDrive } from "../../utils/googleDriveSync.js";

export default function NoteCanvas() {
    const { id } = useParams();
    const quickdrawRef = useRef(null);

    const [driveToken, setDriveToken] = useState(localStorage.getItem("google_drive_token"));
    const [syncStatus, setSyncStatus] = useState("Synced");

    const fileName = `notebook_note_${id}.json`;
    const fileIdStorageKey = `drive_file_id_${id}`;
    const [fileId, setFileId] = useState(localStorage.getItem(fileIdStorageKey));

    const requestDriveAccess = () => {
        /* global google */
        if (window.google && window.google.accounts && window.google.accounts.oauth2) {
            triggerTokenClient();
            return;
        }
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => triggerTokenClient();
        document.body.appendChild(script);
    };

    const triggerTokenClient = () => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
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

    // Load from Google Drive with structural safety checks
    useEffect(() => {
        const fetchNoteFromDrive = async () => {
            if (!driveToken || !quickdrawRef.current) return;
            try {
                setSyncStatus("Loading from Drive...");
                const result = await loadCanvasFromDrive(driveToken, fileName);

                if (result.fileId) {
                    setFileId(result.fileId);
                    localStorage.setItem(fileIdStorageKey, result.fileId);
                }

                if (result.content && quickdrawRef.current.editor) {
                    const parsedData = JSON.parse(result.content);

                    // Safely check if the snapshot contains valid store records before loading
                    if (parsedData && typeof parsedData === 'object' && Object.keys(parsedData).length > 0) {
                        quickdrawRef.current.editor.store.loadSnapshot(parsedData);
                    }
                }
                setSyncStatus("Synced");
            } catch (error) {
                console.error("Failed to load from Google Drive or invalid format:", error);
                setSyncStatus("Synced (New Canvas)");
            }
        };
        fetchNoteFromDrive();
    }, [driveToken, id, fileName, fileIdStorageKey]);

    // Auto-save changes using Quickdraw's snapshot store listener
    useEffect(() => {
        if (!driveToken) return;

        const editor = quickdrawRef.current?.editor;
        if (!editor) return;

        const unsubscribe = editor.store.listen(() => {
            clearTimeout(window.saveTimer);
            window.saveTimer = setTimeout(async () => {
                try {
                    setSyncStatus("Saving to Drive...");
                    const snapshot = editor.store.getSnapshot();
                    const payloadString = JSON.stringify(snapshot);

                    const response = await saveCanvasToDrive(driveToken, fileId, payloadString, fileName);
                    if (response && response.id && !fileId) {
                        setFileId(response.id);
                        localStorage.setItem(fileIdStorageKey, response.id);
                    }
                    setSyncStatus("Saved to Google Drive!");
                } catch (error) {
                    console.error("Auto-save failed:", error);
                    setSyncStatus("Sync error");
                }
            }, 1500);
        });

        return () => unsubscribe();
    }, [driveToken, fileId, fileName, fileIdStorageKey]);

    if (!driveToken) {
        return (
            <div className="flex flex-col h-screen w-screen bg-zinc-950 text-white items-center justify-center gap-4">
                <h2 className="text-xl font-semibold">Google Drive Sync Required</h2>
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
        <div className="w-screen h-[100dvh] relative overflow-hidden bg-zinc-950">
            {/* Responsive status badge positioning to prevent overlapping Quickdraw controls */}
            <div className="absolute top-3 left-3 sm:left-auto sm:right-[180px] z-[999] bg-black/75 text-white px-3 py-1.5 rounded-md text-xs pointer-events-none shadow-md">
                {syncStatus}
            </div>
            <Quickdraw ref={quickdrawRef} className="w-full h-full" />
        </div>
    );
}