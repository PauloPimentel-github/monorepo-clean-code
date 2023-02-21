import Segment from "./Segment";
import NormalFareCalculator from "./NormalCalculator";
import OvernightFareCalculator from "./OvernightFareCalculator";
import OvernightSundayFareCalculator from "./OvernightSundayFareCalculator";
import PeakTimeFareCalculator from "./PeakTimeFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory {
    
    static create(segment: Segment) {
        if (segment.isPeakTime()) return new PeakTimeFareCalculator();
        if (segment.isOvernight() && segment.isSunday())  return new OvernightSundayFareCalculator();
        if (segment.isOvernight() && !segment.isSunday()) return new OvernightFareCalculator();
        if (!segment.isOvernight() && segment.isSunday()) return new SundayFareCalculator();
        if (!segment.isOvernight() && !segment.isSunday()) return new NormalFareCalculator();
        throw new Error();
    }
}