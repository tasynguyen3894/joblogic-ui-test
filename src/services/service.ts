import type { ColorService } from './interfaces';
import { getMockColorService } from './mock';

export function getColorSerivce(): ColorService {
  return getMockColorService();
}

