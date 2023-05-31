import { Injectable } from '@angular/core';
import { title } from 'process';
import { Note } from './note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API_PATH } from 'src/environments/environment';
import { INotes } from '../INotes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();
  options: { headers: HttpHeaders; };

  constructor(
    private httpClient: HttpClient,
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    this.options = { headers };
  }

  getAll(): Observable<INotes[]> {


    return this.httpClient.get<INotes[]>(`${API_PATH}api/Notes`, this.options).pipe(
      map(response => response.map(item => ({
        id: item.id,
        title: item.title,
        text: item.text,
        dataAdd: item.dataAdd,
        dataChange: item.dataChange
      })))
    );
  }
  get(id: number) {
    return this.httpClient.get<INotes>(`${API_PATH}api/Notes/id?id=${id}`, this.options).pipe(
      map(item => ({
        id: item.id,
        title: item.title,
        text: item.text,
        dataAdd: item.dataAdd,
        dataChange: item.dataChange
      }))
    );
  }


  add(note: Note) {
    // this method will add a note to the notes arrya and return the id of the note
    // where the id = index
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
