package com.pm.notes_service.notes.controller;

import com.pm.notes_service.User.repository.UserRepository;
import com.pm.notes_service.User.service.UserService;
import com.pm.notes_service.notes.dto.ContentRequest;
import com.pm.notes_service.notes.dto.NoteMetaDataDTO;
import com.pm.notes_service.notes.dto.NoteRequest;
import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.notes.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody NoteRequest noteRequest,Principal principal) {
        if (principal == null || principal.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = principal.getName();
       return ResponseEntity.status(HttpStatus.CREATED).body(noteService.createNote(noteRequest,email)); //note created
    }
    //ResponseEntity= used to represent the HTTP Response returned by the controller
    // RequestBody = converts json to jackson so that we can use noteRequest object

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NoteMetaDataDTO>> getNote(@PathVariable UUID userId) {
        return ResponseEntity.ok(noteService.getNotesByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable UUID id){
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable UUID id, @RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteService.updateNote(id, noteRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID id){
        noteService.deleteNode(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<NoteMetaDataDTO>> getCurrentUserNotes(Principal principal) {
        // Extract user email/ID from the authenticated principal or JWT
        String email = principal.getName();
        // Fetch user by email to get their UUID, then fetch notes
        UUID userId = userService.getUserIdFromEmail(email);
        return ResponseEntity.ok(noteService.getNotesByUser(userId));
    }

    @PatchMapping("/{id}/content")
    public ResponseEntity<String> patchNoteContent(
            @PathVariable Long id,
            @RequestParam Long userId, // Or extract securely from your Spring Security / JWT context
            @RequestBody ContentRequest request) {

        noteService.saveCanvasContent(id, userId, request.getContent());
        return ResponseEntity.ok("Canvas auto-saved successfully to database!");
    }

}
