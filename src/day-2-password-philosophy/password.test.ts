import { numberOfValidPasswords, Password } from "./password";

const passwords: Password[] = [
    {
        policy: {
            x: 1,
            y: 3,
            character: "a",
        },
        password: "abcde",
    },
    {
        policy: { x: 1, y: 3, character: "b" },
        password: "cdefg",
    },
    {
        policy: { x: 2, y: 9, character: "c" },
        password: "ccccccccc",
    },
];

it("contains two valid passwords with sled-rental policy", () => {
    expect(numberOfValidPasswords(passwords, "sled-rental")).toBe(2);
});

it("contains one valid password with toboggan-corporate policy", () => {
    expect(numberOfValidPasswords(passwords, "toboggan-corporate")).toBe(1);
});
