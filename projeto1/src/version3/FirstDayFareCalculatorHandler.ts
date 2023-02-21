import FareCalculatorHandler from "./FareCalculatorHandler";
import Segment from "./Segment";

export default class FirstDayFareCalculatorHandler implements FareCalculatorHandler {
    FARE = 100;

    constructor(readonly next?: FareCalculatorHandler) {

    }

    calculate(segment: Segment): number {
        if (segment.isFirstDay()) {
            return this.FARE;
        }
        if (!this.next) throw new Error();
        return this.next.calculate(segment);
    }
    
}