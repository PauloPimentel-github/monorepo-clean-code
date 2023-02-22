import FirstDayFareCalculatorHandler from "../../src/version3/chain/FirstDayFareCalculatorHandler";
import NormalFareCalculatorHandler from "../../src/version3/chain/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../../src/version3/chain/OvernightFarecalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../../src/version3/chain/OvernightSundayFarecalculatorHandler";
import PeakTimeFareCalculatorHandler from "../../src/version3/chain/PeakTimeFarecalculatorHandler";
import SundayFareCalculatorHandler from "../../src/version3/chain/SundayFarecalculatorHandler";
import Ride from "../../src/version3/Ride";

let ride: Ride;

beforeEach(function () {
    const normal = new NormalFareCalculatorHandler();
    const overnightSunday = new OvernightSundayFareCalculatorHandler(normal);
    const overnight =  new OvernightFareCalculatorHandler(overnightSunday);
    const sunday = new SundayFareCalculatorHandler(overnight);
    const peakTime = new PeakTimeFareCalculatorHandler(sunday);
    const firstDay = new FirstDayFareCalculatorHandler(peakTime);
    ride = new Ride(firstDay);
})

test('Deve fazer uma corrida em um dia de semana e em horário normal', () => {
    // given, arrange
    ride.addSegment(10, new Date("2023-02-20T10:00:00"));
    // when, act
    const fare = ride.calculateFare();
    // then, assert
    expect(fare).toBe(21);
});

test('Deve fazer uma corrida em um dia de semana e em horário noturno', () => {
    ride.addSegment(10, new Date("2023-02-20T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(39);
});

test('Deve fazer uma corrida em um domingo e em horário normal', () => {
    ride.addSegment(10, new Date("2023-02-19T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(29);
});

test('Deve fazer uma corrida em um domingo e em horário noturno', () => {
    ride.addSegment(10, new Date("2023-02-19T23:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(50);
});

test.each([
    "2023-02-20T07:00:00",
    "2023-02-20T07:30:00",
    "2023-02-20T08:00:00",
    "2023-02-20T08:30:00"
])('Deve fazer uma corrida em horário de pico %p', (date) => {
    ride.addSegment(10, new Date(date));
    const fare = ride.calculateFare();
    expect(fare).toBe(60);
});

test('Deve lançar um erro se a distância for inválida', () => {
    expect(() => ride.addSegment(-10, new Date("2023-02-19T23:00:00"))).toThrow(new Error("Invalid distance"));
});

test('Deve lançar um erro se a data for inválida', () => {
    expect(() => ride.addSegment(10, new Date("abc"))).toThrow(new Error("Invalid date"));
});

test('Deve fazer uma corrida com valor mínimo', () => {
    ride.addSegment(1, new Date("2023-02-20T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(10);
});

test('Deve fazer uma corrida no dia primeiro', () => {
    ride.addSegment(10, new Date("2023-02-01T10:00:00"));
    const fare = ride.calculateFare();
    expect(fare).toBe(100);
});