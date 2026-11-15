import { Directive, TemplateRef, inject } from '@angular/core';

/** Custom leading content (icon, avatar, dot): `<ng-template acpBadgeIcon>`. */
@Directive({ selector: 'ng-template[acpBadgeIcon]' })
export class AcpBadgeIcon {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** Custom trailing content: `<ng-template acpBadgeTrailingIcon>`. */
@Directive({ selector: 'ng-template[acpBadgeTrailingIcon]' })
export class AcpBadgeTrailingIcon {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** All badge slot directives, for `imports: [AcpBadge, ACP_BADGE_SLOTS]`. */
export const ACP_BADGE_SLOTS = [AcpBadgeIcon, AcpBadgeTrailingIcon] as const;
