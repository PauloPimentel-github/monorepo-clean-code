import { validate } from "../src/version2/validator";

test.each([
    "407.302.170-27",
    "684.053.160-00",
    "746.971.314-01"
])("Deve testar um cpf válido", (cpf) => {
    const isValid = validate(cpf);
    expect(isValid).toBeTruthy();
});

test.each([
    "406.302.170-27",
    "406302170",
    "4063021702712345"
])("Deve testar um cpf inválido", (cpf) => {
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});


test("Deve testar um cpf inválido com todos os dígitos iguais", () => {
    const isValid = validate("111.111.111-11");
    expect(isValid).toBeFalsy();
});