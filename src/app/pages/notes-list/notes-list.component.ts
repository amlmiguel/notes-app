import { style, trigger, transition, animate, query, stagger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { INotes } from 'src/app/INotes';
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
        // then animate the spacing (which includes height, margin and padding)
        animate('150ms ease-out', style({
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
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  // notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  notes: INotes[];

  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    // we want to retrieve all notes from NotesServices
    this.get(1);
    this.notesService.get(1);
    // this.filteredNotes = this.notesServices.getAll();
    // this.filter('');
  }

  get(id?) {

    if (id) {
      this.notesService.get(id).subscribe(
        note => {
          this.notes = [note]
        }
      );

    } else {
      this.notesService.getAll().subscribe(
        notes => {
          this.notes = notes
        }
      );

    }

  }

  // tslint:disable-next-line: typedef
  // deleteNote(note: Note) {
  //   const noteId = this.notesServices.getId(note);
  //   this.notesServices.delete(noteId);
  //   this.filter(this.filterInputElRef.nativeElement.value);
  // }

  // // tslint:disable-next-line: typedef
  // // tslint:disable-next-line: no-shadowed-variable
  // filter(query: string) {
  //   query = query.toLowerCase().trim();

  //   let allResults: Note[] = new Array<Note>();
  //   // split up the search query into individual words
  //   let terms: string[] = query.split(' ');
  //   // remove duplicate search terms
  //   terms = this.removerDuplicates(terms);
  //   // compile all relevant results into the allResults array
  //   terms.forEach(term => {
  //     const results = this.relevantNotes(term);
  //     // append results to the allResults arra y
  //     allResults = [...allResults, ...results];
  //   });
  //   // allResults will include duplicate notes
  //   // because a particular note can be the result of many search terms
  //   // but we dont want to show the same note multiple times on the UI
  //   // so we first must remove the duplicates

  //   const uniqueResults = this.removerDuplicates(allResults);
  //   this.filteredNotes = uniqueResults;

  //   // now sort by relevancy
  //   this.sortByRelevancy(allResults);
  // }

  // removerDuplicates(arr: Array<any>): Array<any> {
  //   const uniqueResults: Set<any> = new Set<any>();
  //   // loop through the input array and add the items to the set
  //   arr.forEach(e => uniqueResults.add(e));
  //   return Array.from(uniqueResults);
  // }

  // relevantNotes(query: string): any {
  //   const notesList = this.get();
  //   query = query.toLowerCase().trim();
  //   const relevantNotes = this.notes.filter(note => {
  //     if (note.title && note.title.toLowerCase().includes(query)) {
  //       return true;
  //     }
  //     if (note.body && note.body.toLowerCase().includes(query)) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   return relevantNotes;
  // }

  // // tslint:disable-next-line: typedef
  // sortByRelevancy(searchResults: Note[]){
  //   // This method will calculate the relevancy of a note based on the number of times it appears in search result

  //   const noteCountObj: Object = {}; // format - key: value => NoteId: number (note object id: count)

  //   searchResults.forEach(note => {
  //     const noteId = this.notesServices.getId(note); // get the notes id

  //     if (noteCountObj[noteId]) {
  //       noteCountObj[noteId]++;
  //     } else {
  //       noteCountObj[noteId] = 1;
  //     }
  //   });

  //   this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
  //     const aId = this.notesServices.getId(a);
  //     const bId = this.notesServices.getId(b);

  //     const aCount = noteCountObj[aId];
  //     const bCount = noteCountObj[bId];

  //     return bCount - aCount;
  //   });
  // }

  // // tslint:disable-next-line: typedef
  // generateNoteURL(note: Note) {
  //   const noteId = this.notesServices.getId(note);
  //   return noteId;
  // }

}
