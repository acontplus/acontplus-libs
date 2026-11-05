import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Typed slot directives for `acp-card`. Preferred over `#title`-style template refs:
 * they are type-checked, discoverable and never collide with refs of nested components.
 *
 * @example
 * ```html
 * <acp-card>
 *   <ng-template acpCardTitle>Order #123</ng-template>
 *   <p>Body</p>
 *   <ng-template acpCardActions><acp-button text="Open" /></ng-template>
 * </acp-card>
 * ```
 */
@Directive({ selector: 'ng-template[acpCardHeader]' })
export class AcpCardHeader {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardMedia]' })
export class AcpCardMedia {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardAvatar]' })
export class AcpCardAvatar {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardTitle]' })
export class AcpCardTitle {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardSubtitle]' })
export class AcpCardSubtitle {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardActions]' })
export class AcpCardActions {
  readonly templateRef = inject(TemplateRef);
}

@Directive({ selector: 'ng-template[acpCardFooter]' })
export class AcpCardFooter {
  readonly templateRef = inject(TemplateRef);
}

export const ACP_CARD_SLOTS = [
  AcpCardHeader,
  AcpCardMedia,
  AcpCardAvatar,
  AcpCardTitle,
  AcpCardSubtitle,
  AcpCardActions,
  AcpCardFooter,
] as const;
