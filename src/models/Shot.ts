export class Shot {
    startTime: number;
    image: HTMLImageElement;

    constructor(startTime: number, image: HTMLImageElement) {
        this.startTime = startTime;
        this.image = image;
    }
}