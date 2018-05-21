import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { WorkflowService } from '../../services/workflow.service';

declare var Turbine;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private textBoxes = false;
  private count = [];

  constructor(
    private workflowService: WorkflowService,
  ) { }

  ngOnInit() {
  }

  generateTextbox(count) {
    for (let i = 0; i < count; i++) {
      const secret = UUID.UUID();
      const workFlowInstance = this.workflowService.getWorkflow(secret, i, this);
      this.count.push({
        text: 'empty',
        status: 'not started...',
        disabled: false,
        id: secret,
        workflowInstance: new Turbine(workFlowInstance)
      })
    }
    this.textBoxes = true;
  }

  startWorkflow(action) {
    console.log(action)
    action.workflowInstance.start();
  }
}
