import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { isbnRegex } from '../../../core/regexp/IsbnRegex';
import * as _ from 'lodash';
import { FormDefinition } from '../../shared/FormDefinition';
import { UserItem } from '../user-item.model';
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
  description: string,
  author: string,
  type: string,
  shelf: string,
}

const defaultValues: formValues = {
  author: '',
  description: '',
  isbn: '',
  quality: itemQualityScale.Good,
  shelf: '',
  title: '',
  type: itemTypes.Book
};


export function controls(values: formValues) {
  return {
    isbn: new FormControl(values.isbn, Validators.pattern(isbnRegex)),
    quality: new FormControl(values.quality, [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl(values.title, Validators.required),
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


  public buildFormFromEntity(userItem: UserItem): ItemFormDefinition {

    let values: formValues = {
      isbn: isNull(userItem.item.isbn) ? '' : userItem.item.isbn,
      quality: isNull(userItem.item.quality) ? '' : userItem.item.quality,
      title: isNull(userItem.item.title) ? '' : userItem.item.title,
      description: isNull(userItem.item.description) ? '' : userItem.item.description,
      author: isNull(userItem.item.author) ? '' : userItem.item.author,
      type: isNull(userItem.item.type) ? '' : userItem.item.type,
      shelf: isNull(userItem.item.shelf) ? '' : userItem.item.shelf,
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
