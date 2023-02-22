import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class PeakTimeFareCalculator implements FareCalculator {
    FARE = 6;

    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}
