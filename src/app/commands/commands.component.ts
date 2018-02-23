import { Component, OnInit, Inject } from '@angular/core';
import { Command } from './command';
import { commands } from './commands';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
    public commands: Command[] = commands;
    constructor(private dialog: MatDialog) { }

    ngOnInit() {

    }

    onDetailClick(data: String[]) {
        this.dialog.open(CommandDetailComponent, {data});
    }

}

@Component({
    selector: 'app-command-detail-component',
    templateUrl: 'command-detail.component.html'
})
export class CommandDetailComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: String[],
                public dialogRef: MatDialogRef<CommandDetailComponent>) {}

    onClose() {
        this.dialogRef.close();
    }
}
