export class TimeSlot {
  constructor(public start: Date, public end: Date) {}
  overlaps(other: TimeSlot) {
    return this.start < other.end && other.start < this.end;
  }
}
