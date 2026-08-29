package com.pm.notes_service.websocket;

import com.pm.notes_service.notes.repository.NoteRepository;
import com.pm.notes_service.sync.dto.SyncOperationDTO;
import com.pm.notes_service.sync.service.SyncService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CopyOnWriteArrayList;
@Component
@RequiredArgsConstructor
public class NoteWebSocketHandler extends TextWebSocketHandler {
    // as multiple operations can be done at a time on a connection we need it thread-safe
    private final CopyOnWriteArrayList<WebSocketSession> sessions=new CopyOnWriteArrayList<>();

    private final SyncService syncService;
    private final NoteRepository noteRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("New Device Connected:"+session.getId());
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception{
        sessions.remove(session);
        System.out.println("Device Disconnected:"+session.getId());
    }

    @Override
    public void handleTextMessage(@NonNull WebSocketSession session,@NonNull TextMessage message) throws IOException {
        //receive the live edit from the device's local Sync Engine
        String payload=message.getPayload();

  //1. Main thread for instant broadcast
        //it will instantly transfer the data to other device screen without saving it to db
        for(WebSocketSession activeSession:sessions){
            if(activeSession.isOpen() && !activeSession.getId().equals(session.getId())){
                activeSession.sendMessage(new TextMessage(payload));
            }
        }

        // 2. ASYNCHRONOUS DATABASE SAVE (Background Thread)
        // Hand the data to a background thread to deal with MySQL.
        // The main WebSocket thread is immediately free to process the next keystroke.
        CompletableFuture.runAsync(() -> {
            try {
                // Parse the incoming JSON into our SyncOperationDTO
                SyncOperationDTO syncOperationDTO=objectMapper.readValue(payload,SyncOperationDTO.class);
// For now, we extract a userId from WebSocket. Later, you will extract this from the WebSocket session's JWT token.
                  UUID userId=UUID.fromString(session.getId());
                // Save it to MySQL
                syncService.processLiveEdit(syncOperationDTO,userId);
                // syncService.saveLiveEdit(op);

                System.out.println("Saved to database asynchronously: " + payload);
            } catch (Exception e) {
                System.err.println("Failed to save live edit to DB: " + e.getMessage());
                // Note: Even if this fails, it's okay! (See why below)
            }
        });
    }
}
