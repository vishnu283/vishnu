import { Component, Input, OnInit } from '@angular/core';
import { AppContentService } from '../app-content.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
 
  @Input() public data: any;
  constructor(
    public _appcontent: AppContentService

  ) { }

  edit = true;
  public containerText: string = '';
  container = {
    denialReasonMessage: {
      "moveAccount": "Move this Account to the Second Generation Plan",
      "isOnCurrent": "is on our current service offer",
      "currentPlan": "'s plan",
      "availablePlan": "Available plan",
      "proactiveActions": {
        "title": "Proactive Actions",
        "empty": "No suggested actions at this time"
      },
      "openCases": {
        "title": "Open Cases",
        "empty": "No New Items"
      },
      "accountInfo": {
        "title": "ACCOUNT INFORMATION",
        "accountHolder": "Account Holder",
        "mobileNumber": "Spectrum Mobile Account Number",
        "email": "Email Address",
        "accountNumber": "Spectrum Account Number",
        "contactNumber": "Contact Phone Number",
        "serviceAddress": "Service Address",
        "noRecords": "No customer records found",
        "securityCode": "Security Code"
      },
      "moveSuccess": {
        "heading": "This account has been successfully moved",
        "subheading": "account can now take advantage of our latest plan. Go to Line & Data Details to optimize this account's data!",
        "congratulations": "Congratulations!",
        "toast": "SUCCESS!<br/>This account has been moved to the new plan."
      },
      "moveError": {
        "hero": "A critical error occurred when attempting to migrate this account to the new offer. Escalation to Spectrum Mobile Tier II support is required to return this account to normal.",
        "heading": "Plan move has failed",
        "subheading": "An escalation is required in order to address this failure and complete the plan move. Do not end the call until the plan move issues have been resolved.",
        "toast": "PLAN MOVE ERROR<br/>Plan move failed. Escalation to Spectrum Mobile Tier II support is required to resolve plan move issues."
      },
      "moveTimeout": {
        "heading": "Plan move still processing",
        "subheading": "It's taking longer than expected to move this customer’s account to the new plan. Check later to confirm success. Do not end the call until this move has been completed. If the problem persists, escalate to Spectrum Mobile Tier II support.",
        "toast": "PLAN MOVE IN PROGRESS<br/>This plan move is taking longer than expected, refresh this page to confirm success."
      },
      "notificationPreferences": {
        "header": "Notification Preferences",
        "type": "Notification Type",
        "types": ["Account Alerts", "Data Alerts", "Marketing Messages"],
        "updateButtonText": "Update Preferences",
        "alerts": "Email and SMS alerts"
      },
      "marketingMessages": {
        "header": "Marketing Message History",
        "types": ["Opt-In/Opt-Out SMS", "Date/Time (GMT)", "Account #", "Mobile Phone #"]
      }
    },
    orderCancellationAlerts: {},
    orderDetailsStatus : {
      "title": "ACCOUNT INFORMATION",
      "accountHolder": "Account Holder",
      "mobileNumber": "Spectrum Mobile Account Number",
      "email": "Email Address",
      "accountNumber": "Spectrum Account Number",
      "contactNumber": "Contact Phone Number",
      "serviceAddress": "Service Address",
      "noRecords": "No customer records found",
      "securityCode": "Security Code"
    },
    eligibilityFailure: {},
    eventLists: {},
    agentVerify: {},
    addressMessages: {}
  }


  ngOnInit(): void {
    this._appcontent.sendName.subscribe(name => {
      if (name ==='denialReasonMessage') {
        this.containerText = JSON.stringify(this.container.denialReasonMessage);
      } else if(name ==='orderCancellationAlerts') {
        this.containerText = JSON.stringify(this.container.orderCancellationAlerts);
      } else if(name === 'orderDetailsStatus' ){
        this.containerText = JSON.stringify(this.container.orderDetailsStatus);
      } else if(name === 'eligibilityFailure' ){
        this.containerText = JSON.stringify(this.container.orderDetailsStatus);
      } else if(name === 'orderDetailsStatus' ){
        this.containerText = JSON.stringify(this.container.orderDetailsStatus);
      } 
      this.edit = true;
    });
  }


}
