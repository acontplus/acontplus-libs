import { Directive, TemplateRef, inject } from '@angular/core';

/** Custom content for the icon tile: `<ng-template acpKpiCardIcon>`. */
@Directive({ selector: 'ng-template[acpKpiCardIcon]' })
export class AcpKpiCardIcon {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** Custom avatar: `<ng-template acpKpiCardAvatar>`. */
@Directive({ selector: 'ng-template[acpKpiCardAvatar]' })
export class AcpKpiCardAvatar {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** Footer content: `<ng-template acpKpiCardFooter>`. It stays clickable on interactive cards. */
@Directive({ selector: 'ng-template[acpKpiCardFooter]' })
export class AcpKpiCardFooter {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** Menu items shown behind the "more options" button: `<ng-template acpKpiCardActions>`. */
@Directive({ selector: 'ng-template[acpKpiCardActions]' })
export class AcpKpiCardActions {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}

/** All KPI card slot directives, for `imports: [AcpKpiCard, ACP_KPI_CARD_SLOTS]`. */
export const ACP_KPI_CARD_SLOTS = [
  AcpKpiCardIcon,
  AcpKpiCardAvatar,
  AcpKpiCardFooter,
  AcpKpiCardActions,
] as const;
