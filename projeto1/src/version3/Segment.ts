export default class Segment {

    constructor(readonly distance: number, readonly date: Date) {
        if (!this.isValidDistance(distance)) throw new Error("Invalid distance");
        if (!this.isValidDate(date)) throw new Error("Invalid date");
    }

    isValidDistance(distance: number): boolean {
        return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
    }
    
    isValidDate(date: Date): boolean {
        return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
    }

    isSunday(): boolean {
        return this.date.getDay() === 0;
    }
    
    isOvernight(): boolean {
        return this.date.getHours() >= 22 || this.date.getHours() <= 6;
    }

    isPeakTime(): boolean {
        return (this.date.getHours() >= 7 && this.date.getHours() <= 8) || (this.date.getHours() >= 18 && this.date.getHours() <= 19);
    }

    isFirstDay(): boolean {
        return this.date.getDate() === 1;
    }
}
