/**
 * @todo anti-pattern model
 * public properties in model it's stateful anti-pattern, but redux approach and copying by ...
 * is common known approach from basic usage of redux.
 * welcome to weired world of javascript technologies.
 *
 * It's quite obvious that code shouldn't be fixed to concrete technology, but as beginner i don't know how to that better
 * making writing code as fast as in common approach (using ... operator)
 */
export class Item {
  public id: string;
  public isbn: string;
  public quality: string;
  public title: string;
  public customId: string;
  public description: string;
  public author: string;
  public type: string;
  public shelf: string | null;

  constructor(
    id: string,
    isbn: string,
    quality: string,
    title: string,
    customId: string,
    description: string,
    author: string,
    type: string,
    shelf: string | null,
  ) {
    this.id = id;
    this.isbn = isbn;
    this.quality = quality;
    this.title = title;
    this.customId = customId;
    this.description = description;
    this.author = author;
    this.type = type;
    this.shelf = shelf;
  }


}
