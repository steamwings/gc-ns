import { Injectable } from '@angular/core';

@Injectable()
export abstract class PopupService {
  abstract warning(options);
  // confirm() // TODO
  abstract prompt(options, fulfilled?: (result?) => void, rejected?: () => void);
  // toast() // TODO: use snackbars
}
