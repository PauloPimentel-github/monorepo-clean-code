import { calculateRide } from "../../src/version2/main";

test('Deve fazer uma corrida em um dia de semana e em horário normal', () => {
    // given, arrange
    const segments = [
        { distance: 10, date: new Date("2023-02-20T10:00:00") }
    ];

    // when, act
    const fare = calculateRide(segments);

    // then, assert
    expect(fare).toBe(21);
});

test('Deve fazer uma corrida em um dia de semana e em horário noturno', () => {
    const segments = [
        { distance: 10, date: new Date("2023-02-20T23:00:00") }
    ];

    const fare = calculateRide(segments);

    expect(fare).toBe(39);
});

test('Deve fazer uma corrida em um domingo e em horário normal', () => {
    const segments = [
        { distance: 10, date: new Date("2023-02-19T10:00:00") }
    ];

    const fare = calculateRide(segments);

    expect(fare).toBe(29);
});


test('Deve fazer uma corrida em um domingo e em horário noturno', () => {
    const segments = [
        { distance: 10, date: new Date("2023-02-19T23:00:00") }
    ];

    const fare = calculateRide(segments);

    expect(fare).toBe(50);
});

test('Deve retornar error se a distância for inválida', () => {
    const segments = [
        { distance: -10, date: new Date("2023-02-19T23:00:00") }
    ];

    expect(() => calculateRide(segments)).toThrow(new Error("Invalid distance"));
});

test('Deve retornar error se a data for inválida', () => {
    const segments = [
        { distance: 10, date: new Date("abc") }
    ];

    expect(() => calculateRide(segments)).toThrow(new Error("Invalid date"));
});

test('Deve retornar uma corrida com valor mínimo', () => {
    const segments = [
        { distance: 1, date: new Date("2023-02-20T10:00:00") }
    ];

    const fare = calculateRide(segments);

    expect(fare).toBe(10);
});