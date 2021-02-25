import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export class TodoItemNode {
  children: TodoItemNode[] = [];
  item: string = '';
}

const TREE_DATA = {
  Root: { 'App Component': null }
};
@Injectable()
export class AppContentService {
  sendName: Subject<string> = new Subject();
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  jsonData: any = {};

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  
  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

/** Add an item to to-do list */
  insertParent(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name, children: [{item: ''}] } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
