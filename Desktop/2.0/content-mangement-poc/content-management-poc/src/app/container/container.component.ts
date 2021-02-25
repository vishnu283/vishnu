import { Component, OnInit, ViewChild } from '@angular/core';
import { AppContentService } from '../app-content.service';
import { JsonEditorComponent, JsonEditorOptions } from "ang-jsoneditor";
import { schema } from '../schema.value';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @ViewChild("editor") editor: JsonEditorComponent = new JsonEditorComponent();
  public editorOptions: JsonEditorOptions;
  public data: any;

  edit = true;
  public containerText: string | undefined = undefined;
  container: any = {};
  name: string = '';

  dataMulti: any = {
    products: [
      {
        name: "car",
        product: [
          {
            name: "honda",
            model: [
              { id: "civic", name: "civic" },
              { id: "accord", name: "accord" },
              { id: "crv", name: "crv" },
              { id: "pilot", name: "pilot" },
              { id: "odyssey", name: "odyssey" }
            ]
          }
        ]
      },
      {
        name: "book",
        product: [
          {
            name: "dostoyevski",
            model: [
              { id: "Axe", name: "Axe" },
              { id: "accord", name: "accord" },
              { id: "crv", name: "crv" },
              { id: "pilot", name: "pilot" },
              { id: "odyssey", name: "odyssey" }
            ]
          }
        ]
      }
    ]
  };

  constructor(public _appcontent: AppContentService) { 

    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema = schema;

    this.initEditorOptions(this.editorOptions);

  }

  ngOnInit(): void {
    debugger

    this._appcontent.sendName.subscribe(name => {
      debugger
      this.name = name;
      this.containerText = '';
      if (this.container && this.container[name]) {
        this.containerText = this.container[name];
      } else {
        this.containerText = this.container[name] = '';
      }
      this.edit = true;
    });

  }

  editForm() {
    this.edit=!this.edit
  }

  saveForm(txt?: any) {

    const editorJson = this.editor.getEditor();
    editorJson.validate();
    const errors = editorJson.validateSchema.errors;
    if (errors && errors.length > 0) {
      console.log("Errors found");
      editorJson.set(this.data);
    } else {
      this.container[this.name] = this.editor.get();
      this.edit=!this.edit
    }

  }

  initEditorOptions(editorOptions: any) {
     editorOptions.mode = 'code'; // set only one mode
  }
  
  changeLog(event = null) {
    console.log(event);
    console.log("change:", this.editor);

    /**
     * Manual validation based on the schema
     * if the change does not meet the JSON Schema, it will use the last data
     * and will revert the user change.
     */
    const editorJson = this.editor.getEditor();
    editorJson.validate();
    const errors = editorJson.validateSchema.errors;
    if (errors && errors.length > 0) {
      console.log("Errors found");
      editorJson.set(this.data);
    } else {
      this.data = this.editor.get();
    }
  }
  
}