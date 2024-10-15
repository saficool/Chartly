import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RandomNumberGeneratorService {

    constructor() { }

    GenerateRandomNumber(): number {
        return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    }
}