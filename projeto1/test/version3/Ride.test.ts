import Ride from "../../src/version3/Ride";

test('Deve fazer uma corrida em um dia de semana e em horário normal', () => {
    // given, arrange
    const ride = new Ride();
    ride.addSegment(10, new Date("2023-02-20T10:00:00"));

    // when, act
    const fare = ride.calculateFare();

    // then, assert
    expect(fare).toBe(21);
});

test('Deve fazer uma corrida em um dia de semana e em horário noturno', () => {
    // given, arrange
    const ride = new Ride();
    ride.addSegment(10, new Date("2023-02-20T23:00:00"));

    // when, act
    const fare = ride.calculateFare();

    // then, assert
    expect(fare).toBe(39);
});

test('Deve fazer uma corrida em um domingo e em horário normal', () => {
    // given, arrange
    const ride = new Ride();
    ride.addSegment(10, new Date("2023-02-19T10:00:00"));

    // when, act
    const fare = ride.calculateFare();

    // then, assert
    expect(fare).toBe(29);
});

test('Deve fazer uma corrida em um domingo e em horário noturno', () => {
    // given, arrange
    const ride = new Ride();
    ride.addSegment(10, new Date("2023-02-19T23:00:00"));

    // when, act
    const fare = ride.calculateFare();

    // then, assert
    expect(fare).toBe(50);
});