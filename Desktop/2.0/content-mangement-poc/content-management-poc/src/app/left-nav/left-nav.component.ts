import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AppContentService } from '../app-content.service';
/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[] = [];
  item: string = '';
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string = '';
  level: number = 0;
  expandable: boolean = false;
}
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {
  
   /** Map from flat node to nested node. This helps us finding the nested node to be modified */
   flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

   /** Map from nested node to flattened node. This helps us to keep the same object for selection */
   nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
 
   /** A selected parent node to be inserted */
   selectedParent: TodoItemFlatNode | null = null;
 
   /** The new item's name */
   newItemName = '';
 
   treeControl: FlatTreeControl<TodoItemFlatNode>;
 
   treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
   dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
   /** The selection for checklist */
   checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
   disabledOptions: boolean = false;
   constructor(private _database: AppContentService) {
     this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
     this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
     this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
     _database.dataChange.subscribe(data => {
       this.dataSource.data = data;
     });
   }
 
   getLevel = (node: TodoItemFlatNode) => node.level;
 
   isExpandable = (node: TodoItemFlatNode) => node.expandable;
 
   isDisabled = (node: TodoItemFlatNode) => this.disabledOptions;
 
   getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
 
   hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable && _nodeData.item;
 
   hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
 
   hasContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item !== '';
 
   isFile = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === 'Enter File Name';
 
   isFolder = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === 'Enter Folder Name';
 
   /**
    * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
    */
   transformer = (node: TodoItemNode, level: number) => {
     const existingNode = this.nestedNodeMap.get(node);
     const flatNode = existingNode && existingNode.item === node.item
         ? existingNode
         : new TodoItemFlatNode();
     flatNode.item = node.item;
     flatNode.level = level;
     flatNode.expandable = !!node.children?.length;
     this.flatNodeMap.set(flatNode, node);
     this.nestedNodeMap.set(node, flatNode);
     return flatNode;
   }
  
   /** Select the category so we can insert the new item. */
   addNewFile(node: TodoItemFlatNode) {
     const parentNode = this.flatNodeMap.get(node);
     this._database.insertItem(parentNode!, 'Enter File Name');
     this.treeControl.expand(node);
     this.disabledOptions = true;
   }
 
   addNewFolder(node: TodoItemFlatNode) {
     const parentNode = this.flatNodeMap.get(node);
     this._database.insertParent(parentNode!, 'Enter Folder Name');
     this.treeControl.expand(node);
     this.disabledOptions = true;
   }
 
   /** Save the node to database */
   saveNode(node: TodoItemFlatNode, itemValue: string) {
     debugger
     const nestedNode = this.flatNodeMap.get(node);
     this._database.updateItem(nestedNode!, itemValue);
     this.disabledOptions = false;
   }
 
   cancelNode(node: TodoItemFlatNode) {
     const nestedNode = this.flatNodeMap.get(node);
     this._database.updateItem(nestedNode!, '');
     this.disabledOptions = false;
   }
  
   route(node: TodoItemFlatNode) {
     this._database.sendName.next(node.item);
   }
}