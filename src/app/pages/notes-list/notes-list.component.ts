import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(
    private notesServices: NotesService
  ) { }

  ngOnInit(): void {
    // we wanto to retrieve all notes from NotesServices

    this.notes = this.notesServices.getAll();
  }

  deleteNote(id: number) {
    this.notesServices.delete(id);
  }

}
