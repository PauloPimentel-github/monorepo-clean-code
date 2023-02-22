import Segment from "../Segment";
import NormalFareCalculator from "../strategy/NormalCalculator";
import OvernightFareCalculator from "../strategy/OvernightFareCalculator";
import OvernightSundayFareCalculator from "../strategy/OvernightSundayFareCalculator";
import PeakTimeFareCalculator from "../strategy/PeakTimeFareCalculator";
import SundayFareCalculator from "../strategy/SundayFareCalculator";

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
