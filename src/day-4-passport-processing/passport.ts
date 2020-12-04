interface BasicPassport {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid: string;
}

function isValidYear(year: number, min: number, max: number): boolean {
    return String(year).length === 4 && year >= min && year <= max;
}

function isValidHeight(height: string): boolean {
    const sufix = height.slice(-2);
    const number = Number(height.slice(0, -2));
    if (isNaN(number)) return false;
    if (sufix === "cm") {
        return number >= 150 && number <= 193;
    } else if (sufix === "in") {
        return number >= 59 && number <= 76;
    } else {
        return false;
    }
}

function isValidHairColor(color: string): boolean {
    const prefix = color[0];
    if (prefix !== "#") return false;
    return /[0-9a-f]{6}/.test(color.slice(1));
}

function isValidEyeColor(color: string): boolean {
    const valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return valid.includes(color);
}

function isBasicPassport(o: any, ignoreCid: boolean): o is BasicPassport {
    let properties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
    if (ignoreCid) properties = properties.filter((p) => p !== "cid");
    return properties.every((p) => typeof o[p] === "string");
}

export function isPassport(
    o: any,
    ignoreCid: boolean,
    strictValidation = false
): boolean {
    let properties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
    if (ignoreCid) properties = properties.filter((p) => p !== "cid");
    if (isBasicPassport(o, ignoreCid)) {
        if (!strictValidation) {
            return true;
        } else {
            return (
                isValidYear(Number(o.byr), 1920, 2002) &&
                isValidYear(Number(o.iyr), 2010, 2020) &&
                isValidYear(Number(o.eyr), 2020, 2030) &&
                isValidHeight(o.hgt) &&
                isValidHairColor(o.hcl) &&
                isValidEyeColor(o.ecl) &&
                /[0-9]{9}/.test(o.pid)
            );
        }
    } else {
        return false;
    }
}
