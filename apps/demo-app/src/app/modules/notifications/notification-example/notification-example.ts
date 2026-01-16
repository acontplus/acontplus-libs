import { Component } from '@angular/core';
import { WhatsAppSender } from '@acontplus/ng-common';
@Component({
  selector: 'app-notification-example',
  templateUrl: './notification-example.html',
  imports: [WhatsAppSender],
})
export class NotificationExample {}
