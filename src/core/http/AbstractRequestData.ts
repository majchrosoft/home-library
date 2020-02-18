export abstract class AbstractRequestData {
  protected metaUrl: string;
  protected abstract paramNames: string[];
  protected abstract params: string[];

  get url(): string {

    const bindUrlParameter = (partialUrl: string,
                              paramName: string,
                              index: number) => {
      return partialUrl.replace(paramName, this.params[index]);
    }

    if (this.params.length === 0) {
      return this.metaUrl;
    }

    const buildUrl = () => {
      return this.paramNames.reduce(bindUrlParameter, this.metaUrl);
    }

    return buildUrl();
  }
}
