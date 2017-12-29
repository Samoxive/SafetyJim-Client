import { Component, OnInit } from '@angular/core';
import { Command } from './command';
import { commands } from './commands';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
    public commands: Command[] = commands;
    constructor() { }

    ngOnInit() {

    }

}
