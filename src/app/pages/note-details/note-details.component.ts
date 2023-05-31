import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { INotes } from 'src/app/INotes';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: INotes;
  noteId: number;
  new: boolean;
  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // we want find out if we are creating a new note or editing an existing one
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.notesService.get(params.id).subscribe((note: INotes) => {
          this.note = note;
          this.noteId = params.id;
          this.new = false;
        });
    } else {
      this.new = true;
    }
  })
}

  onSubmit(form: NgForm) {
    if (this.new) {
      //  Save the note
      this.notesService.add(form.value);
      this.router.navigateByUrl('/');
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body)
    }
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/')
  }
}
