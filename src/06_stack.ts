// In this lesson we're going to implement a basic stack.
// The interfaces are given. Make sure the size cannot be modified from the
// outside.

// In JavaScript / TypeScript, we can declare getter functions using the
// following syntax:
//
// ```ts
// class MyClass {
//   get myProp (): number {
//     return 123;
//   }
// }
// ```
//
// The same works for setters, but we don't need them for this exercise.

interface IStack <T> {
  size: number;

  push(value: T): void;
  pop(): T;
  peek(): T;
  toArray(): Array<T>;
}

export class Stack<T> implements IStack<T> {
    private head: LastStackFrame<T> = new LastStackFrame<T>();

    size = 1;

    push(value: T) {
        this.head = this.head.push(value);
    }

    pop() {
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }

    peek() {
        const value = this.head.value;
        return value;
    }

    toArray() {
        return this.head.toArray();
    }
}

interface IStackFrame <T> {
  value: T;
  next: IStackFrame<T>;
  toArray(): Array<T>;

  push(value: T): IStackFrame<T>;
}

class StackFrame<T> implements IStackFrame<T> {
    public value: T;
    public next: LastStackFrame<T> = new LastStackFrame<T>();

    constructor (value: T) {
      this.value = value;
    }

    toArray() {
        return [this.value, ...this.next.toArray()];
    }

    push(value: T) {
        this.next = this.next.push(value);
        return this;
    }
}

class LastStackFrame<T> implements IStackFrame<T> {
    public value: T = null;
    public next: TailQueueItem<T> = this;

    toArray() {
        return [];
    }

    push(value: T) {
        return new StackFrame<T>(value);
    }
}
