import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
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

export const itemTypesArray: itemTypes[] = [
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

export const enum itemQualityScale {
  VeryPoor = 'Very poor',
  Poor = 'Poor',
  Average = 'Average',
  Good = 'Good',
  Ideal = 'Ideal'
}

export const itemQualityScaleList: itemQualityScale[] = [
  itemQualityScale.VeryPoor,
  itemQualityScale.Poor,
  itemQualityScale.Average,
  itemQualityScale.Good,
  itemQualityScale.Ideal,
];


export const validatorErrorMessages = {
  'isbn': {
    'required': 'The isbn field is required',
    'pattern': 'The isbn must be numeric'
  }
};


const controls = {
  isbn: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  quality: new FormControl(itemQualityScale.Good, [Validators.required, Validators.pattern('^[0-9]*$')]),
  title: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  author: new FormControl('', Validators.required),
  type: new FormControl(itemTypes.Book, Validators.required),
  shelf: new FormControl('', Validators.required),
};

@Injectable({
  providedIn: 'root'
})
export class ItemFormDefinitions {
  create(): FormGroup {
    return new FormGroup(controls)
  }
}
