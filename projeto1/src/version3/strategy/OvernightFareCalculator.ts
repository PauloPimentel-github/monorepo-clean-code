import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class OvernightFareCalculator implements FareCalculator {
    FARE = 3.9;

    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}
