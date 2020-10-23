import { concatenatorArrayReducer } from '../../../../core/helper/array/reducer/concatenatorArrayReducer';
import { UserItemUriBuilder } from './user-item-uri-builder';
import { resourceEnum } from './resource-enum';

const DOMAIN = 'https://home-library-d13b5.firebaseio.com';
const SEPARATOR = '/';

export abstract class AbstractUriBuilder {

  private container: string[];

  protected constructor() {
    this.container.push(DOMAIN);
    this.addSeparator();
  }

  public with(resource: string): this {
    this.push(resource);
    return this;
  }

  public of(id: string): this {
    this.push(id);
    return this;
  }

  public anUri(): this {
    this.push(DOMAIN);
    return this;
  }

  build(): string {
    this.addJsonSuffix();
    return this.container.reduce(concatenatorArrayReducer, '');
  }

  protected finalResourceSuffix(): string {
    return '.json';
  };

  private addSeparator(): void {
    this.container.push(SEPARATOR);
  }

  protected push(element: string, withSeparator: boolean = true) {
    this.container.push(element);
    if (withSeparator) {
      this.addSeparator();
    }
  }

  private addJsonSuffix(): void {
    if (this.isLastIsSlash()) {
      this.container[this.container.length - 1] = this.finalResourceSuffix();
    } else {
      this.push(this.finalResourceSuffix(), false);
    }
  }

  private isLastIsSlash(): boolean {
    return this.container[this.container.length - 1] === SEPARATOR;
  }


}
