export class Borrow {
  public isBorrowed: boolean;
  public startAt: Date | null;
  public expectedEndAt: Date | null;
  public borrowerEmail: string | null;
  public borrowerName: string | null;
  public borrowerData: string | null;

  constructor(
    isBorrowed: boolean,
    startAt: Date | null,
    expectedEndAt: Date | null,
    borrowerEmail: string | null,
    borrowerName: string | null,
    borrowerData: string | null,
  ) {
    this.isBorrowed = isBorrowed;
    this.startAt = startAt;
    this.expectedEndAt = expectedEndAt;
    this.borrowerEmail = borrowerEmail;
    this.borrowerName = borrowerName;
    this.borrowerData = borrowerData;
  }

}

export class EmptyBorrowed extends Borrow {
  constructor(
    isBorrowed: boolean,
  ) {
    super(
      isBorrowed,
      null,
      null,
      null,
      null,
      null,
    );
  }
}

export class NonBorrowed extends EmptyBorrowed {
  constructor() {
    super(
      false
    );
  }
}

export function factorizeIsNotBorrowed() {
  return new NonBorrowed();
}

export function factorizeIsBorrowed(
  isBorrowed: boolean,
  startAt: Date | null,
  expectedEndAt: Date | null,
  borrowerEmail: string | null,
  borrowerName: string | null,
  borrowerData: string | null,
) {
  return new Borrow(
    isBorrowed,
    startAt,
    expectedEndAt,
    borrowerEmail,
    borrowerName,
    borrowerData,
  );
}

export function factorizeEmptyBorrowed(
  isBorrowed: boolean
) {
  return new EmptyBorrowed(isBorrowed);
}
