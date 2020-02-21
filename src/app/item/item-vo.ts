export class Item {
  public isbn: string;
  public quality: string;
  public title: string;
  public customId: string;
  public description: string;
  public author: string;
  public type: string;
  public shelf: string | null;

  constructor(
    isbn: string,
    quality: string,
    title: string,
    customId: string,
    description: string,
    author: string,
    type: string,
    shelf: string | null,
  ) {
    this.isbn = isbn;
    this.quality = quality;
    this.title = title;
    this.customId = customId;
    this.description = description;
    this.author = author;
    this.type = type;
    this.shelf = shelf;
  }

  public static createEmpty(): Item {
    return new Item(
      '',
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
