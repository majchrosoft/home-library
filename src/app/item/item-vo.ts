export class Item {
  public isbn: string;
  public quality: string;
  public title: string;
  public description: string;
  public author: string;
  public type: string;
  public bookcase: string | null;

  constructor(
    isbn: string,
    quality: string,
    title: string,
    description: string,
    author: string,
    type: string,
    bookcase: string | null,
  ) {
    this.isbn = isbn;
    this.quality = quality;
    this.title = title;
    this.description = description;
    this.author = author;
    this.type = type;
    this.bookcase = bookcase;
  }

  public static createEmpty(): Item {
    return new Item(
      '',
      '',
      '',
      '',
      '',
      '',
      null,
    )
  }
}
