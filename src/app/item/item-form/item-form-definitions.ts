import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

export const enum itemTypes {
  Book = 'Book',
  Audio = 'Audio CD',
  Tape = 'Tape',
  Vinyl = 'Vinyl',
  ComputerProgramme = 'Computer Programme',
  ComputerGame = 'Computer Game',
  Movie = 'Movie',
  ComicBook = 'Comic book',
  Another = 'Another'
}

export const itemTypesArray: string[] = [
  itemTypes.Book,
  itemTypes.Audio,
  itemTypes.Tape,
  itemTypes.Vinyl,
  itemTypes.ComputerProgramme,
  itemTypes.ComputerGame,
  itemTypes.Movie,
  itemTypes.ComicBook,
  itemTypes.Another,
];


const controls = {
  title: new FormControl('', Validators.required),
  author: new FormControl('', Validators.required),
  type: new FormControl(itemTypes.Book, Validators.required),
};

@Injectable({
  providedIn: 'root'
})
export class ItemFormDefinitions {
  create(): FormGroup {
    return new FormGroup(controls)
  }
}
