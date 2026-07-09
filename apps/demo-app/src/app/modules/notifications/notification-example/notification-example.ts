import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WhatsAppSender } from '@acontplus/ng-common';
@Component({
  selector: 'app-notification-example',
  templateUrl: './notification-example.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [WhatsAppSender],
})
export class NotificationExample {}
