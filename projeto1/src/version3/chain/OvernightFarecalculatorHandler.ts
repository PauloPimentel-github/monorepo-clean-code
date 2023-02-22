import Segment from "../Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class OvernightFareCalculatorHandler implements FareCalculatorHandler {
    FARE = 3.9;

    constructor(readonly next?: FareCalculatorHandler) {}

    calculate(segment: Segment): number {
        if (segment.isOvernight() && !segment.isSunday()) {
            return segment.distance * this.FARE;
        }
        if (!this.next) throw new Error();
        return this.next.calculate(segment);
    }
}
