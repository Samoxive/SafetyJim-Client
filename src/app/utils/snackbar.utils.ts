import { MatSnackBar } from '@angular/material';

export function dismissableSnackbar(snackbarFactory: MatSnackBar, message: string) {
    const snackbar = snackbarFactory.open(message, 'Okay');
    snackbar.onAction().subscribe(() => snackbar.dismiss());
}
