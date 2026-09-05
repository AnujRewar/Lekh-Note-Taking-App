package com.pm.notes_service.notes.controller;

import com.pm.notes_service.notes.dto.NoteMetaDataDTO;
import com.pm.notes_service.notes.dto.NoteRequest;
import com.pm.notes_service.notes.entity.Note;
import com.pm.notes_service.notes.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody NoteRequest noteRequest) {
       return ResponseEntity.status(HttpStatus.CREATED).body(noteService.createNote(noteRequest)); //note created
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

}
