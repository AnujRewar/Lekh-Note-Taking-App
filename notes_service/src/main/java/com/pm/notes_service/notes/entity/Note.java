package com.pm.notes_service.notes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;   //unique id of note

    @Column(name="user_id",nullable=false)
    private UUID userId;   //owner of note

    @Column(nullable=false)
    private String title;  //note title

    @Column(columnDefinition = "TEXT")
    private String content;  //actual note content

    @Builder.Default //giving initially a predictable stat
    @Column(nullable = false)
    private Long version=1L;   //version number

    @Column(nullable = false)
    private Instant createdAt;  //when notes created

    @Column(nullable = false)
    private Instant updatedAt;

    @Builder.Default //explicitly telling lombok that during creation deleted=false
    @Column(nullable = false)
    private boolean deleted=false;

    @Column(name="file_type",nullable=false)
    private String fileType="TEXT";

    @PrePersist
    protected void onCreate(){
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = Instant.now();
    }

}
