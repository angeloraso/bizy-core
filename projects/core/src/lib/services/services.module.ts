import { NgModule } from '@angular/core';
import { BizyAnimationService } from './animation.service';
import { BizyViewportService } from './viewport.service';
import { BizyKeyboardService } from './keyboard.service';
import { BizyExportToCSVService } from './export-to-csv.service';
import { BizyCacheService } from './cache.service';
import { BizyUserAgentService } from './user-agent/user-agent.service';
import { BizyValidatorService } from './validator.service';
import { BizyStorageService } from './storage.service';
import { BizyLogService } from './log.service';
import { BizyRouterService } from './router.service';
import { BizyCopyToClipboardService } from './copy-to-clipboard.service';

const SERVICES: Array<any> = [
  BizyAnimationService,
  BizyViewportService,
  BizyKeyboardService,
  BizyExportToCSVService,
  BizyCacheService,
  BizyUserAgentService,
  BizyValidatorService,
  BizyStorageService,
  BizyLogService,
  BizyRouterService,
  BizyCopyToClipboardService
]

@NgModule({
  providers: SERVICES
})

export class BizyServicesModule {}
