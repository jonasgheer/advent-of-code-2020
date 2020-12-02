export type PolicyStandard = "sled-rental" | "toboggan-corporate";

export interface Password {
    policy: {
        x: number;
        y: number;
        character: string;
    };
    password: string;
}

export function numberOfValidPasswords(
    passwords: Password[],
    policyStandard: PolicyStandard
): number {
    return passwords.filter((pw) => isValidPassword(pw, policyStandard)).length;
}

function isValidPassword(
    pw: Password,
    policyStandard: PolicyStandard
): boolean {
    const numberOfPolicyCharacters = pw.password
        .split("")
        .filter((c) => c === pw.policy.character).length;
    switch (policyStandard) {
        case "sled-rental":
            return (
                numberOfPolicyCharacters >= pw.policy.x &&
                numberOfPolicyCharacters <= pw.policy.y
            );
        case "toboggan-corporate":
            return (
                [
                    pw.password[pw.policy.x - 1],
                    pw.password[pw.policy.y - 1],
                ].filter((c) => c === pw.policy.character).length === 1
            );
        default:
            return assertUnreachableCase(policyStandard);
    }
}

function assertUnreachableCase(c: never): never {
    throw Error(`Unreacable case: ${c}`);
}
