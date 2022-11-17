import { style, trigger, transition, animate, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // Entry animation
      transition('void => *', [
        // Initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'sclae(0.85)',
          'margin-bottom': 0,
          // we have to expand out the padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*'
        })),
        animate(200)
      ]),
      transition('* => void', [
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then scale down back to normal size while beginning to fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and fade out complete
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        //then animate the spacing (which includes height, margin and padding)
        animate('150ms ease-out', style ({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0'
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(200, [
            animate('0.5s ease')
          ])
        ], {
          optional: true
        } )
      ])
    ])
  ]
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
