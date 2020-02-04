import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isbnRegex } from '../../../core/regexp/IsbnRegex';
import * as _ from 'lodash';
import { FormDefinition } from '../../shared/FormDefinition';
import { Item } from '../item.model';
import { isNull } from 'util';

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


const validatorErrorMessages = {
  'isbn': {
    'pattern': 'Please enter valid ISBN number'
  }
};

interface formValues {
  isbn: string,
  quality: string,
  title: string,
  customId: string,
  description: string,
  author: string,
  type: string,
  shelf: string,
}

let defaultValues: formValues = {
  author: '',
  customId: '',
  description: '',
  isbn: '',
  quality: itemQualityScale.Good,
  shelf: '',
  title: '',
  type: itemTypes.Book
};


export function controls(values: formValues) {
  return {
    isbn: new FormControl(values.isbn, [
      Validators.required,
      Validators.pattern(isbnRegex)
    ]),
    quality: new FormControl(values.quality, [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl(values.title, Validators.required),
    customId: new FormControl(values.customId),
    description: new FormControl(values.description, Validators.required),
    author: new FormControl(values.author, Validators.required),
    type: new FormControl(values.type, Validators.required),
    shelf: new FormControl(values.shelf),
  };
}

export class ItemFormDefinition implements FormDefinition {

  private formGroup: FormGroup | null = null;

  public form(): FormGroup {
    if (isNull(this.formGroup)) {
      throw new Error('form called before initialized');
    }
    return this.formGroup;
  }


  public buildFormFromEntity(item: Item): ItemFormDefinition {

    let values: formValues = {
      isbn: isNull(item.isbn) ? '' : item.isbn,
      quality: isNull(item.quality) ? '' : item.quality,
      title: isNull(item.title) ? '' : item.title,
      customId: isNull(item.customId) ? '' : item.customId,
      description: isNull(item.description) ? '' : item.description,
      author: isNull(item.author) ? '' : item.author,
      type: isNull(item.type) ? '' : item.type,
      shelf: isNull(item.shelf) ? '' : item.shelf,
    };
    this.formGroup = new FormGroup(controls(values));

    return this;
  }


  public buildFormFromDefaultValues(): ItemFormDefinition {
    if (_.isNull(this.formGroup)) {
      this.formGroup = new FormGroup(controls(defaultValues));
    }
    return this;
  }


  validatorErrorMessages() {
    return validatorErrorMessages;
  }
}
