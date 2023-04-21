export interface Dimmable {
  readonly value: number;
  up(): void;
  down(): void;
}
