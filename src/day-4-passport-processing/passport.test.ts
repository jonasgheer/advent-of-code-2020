import { isPassport } from "./passport";

const passport = {
    ecl: "gry",
    pid: 860033327,
    eyr: 2020,
    hcl: "#fffffd",
    byr: 1937,
    iyr: 2017,
    cid: 147,
    hgt: "183cm",
};

it("passport is valid with cid", () => {
    expect(isPassport(passport, false)).toBe(true);
});

it("passport is valid when cid is ignored", () => {
    const passportMissingCid = Object.assign({}, passport, { cid: undefined });
    expect(isPassport(passportMissingCid, true)).toBe(true);
});

it("passport missing hgt is invalid", () => {
    const passportMissingHgt = Object.assign({}, passport, { hgt: undefined });
    expect(isPassport(passportMissingHgt, false)).toBe(false);
});
