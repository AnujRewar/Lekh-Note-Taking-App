import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, {useEffect} from "react";

export default function NoteCanvas() {
    const {id}= useParams();
    const notebookId = id;
    const storageKey = `notebook_canvas_${notebookId}`;
    const savedSnapshot = localStorage.getItem(storageKey);// Gets the unique notebook ID from the URL
    useEffect(() => {
        // Repeatedly check for the watermark element until it loads, then remove it
        const interval = setInterval(() => {
            const selectors = [
                '.tl-watermark',
                '[class*="watermark"]',
                'a[href*="tldraw.dev"]'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => el.remove()); // Force structural deletion from the DOM
            });
        }, 100);

    return () => clearInterval(interval);
          }, []);

return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <Tldraw persistenceKey={storageKey}/>
    </div>
);


}