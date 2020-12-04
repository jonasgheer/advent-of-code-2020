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
    const suffix = height.slice(-2);
    const _height = Number(height.slice(0, -2));
    if (isNaN(_height)) return false;
    if (suffix === "cm") {
        return _height >= 150 && _height <= 193;
    } else if (suffix === "in") {
        return _height >= 59 && _height <= 76;
    } else {
        return false;
    }
}

function isValidHairColor(hcl: string): boolean {
    const prefix = hcl[0];
    if (prefix !== "#") return false;
    return /^[0-9a-f]{6}$/i.test(hcl.slice(1));
}

function isValidEyeColor(ecl: string): boolean {
    const valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return valid.includes(ecl);
}

function isBasicPassport(o: any, ignoreCid: boolean): o is BasicPassport {
    let properties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
    if (ignoreCid) properties = properties.filter((p) => p !== "cid");
    return properties.every((p) => o[p] !== undefined);
}

export function isPassport(
    o: any,
    ignoreCid: boolean,
    strictValidation = false
): boolean {
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
                /^[0-9]{9}$/.test(o.pid)
            );
        }
    } else {
        return false;
    }
}
