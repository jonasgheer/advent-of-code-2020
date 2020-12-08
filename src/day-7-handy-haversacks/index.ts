import fs from "fs";
import path from "path";
import _ from "lodash";

interface Bag {
    value: string;
    quantity: number; // todo: this does not belong here, but f**k it
    bags: Bag[] | null;
    discovered: boolean;
}

function parseRawInput(input: string): Record<string, Bag> {
    let topBags: Record<string, Bag> = {};
    input
        .trim()
        .replace(/\./g, "")
        .replaceAll("bags", "bag")
        .split("\n")
        .forEach((line) => {
            let [topBag, _childBags] = line.split("contain");
            topBag = topBag.trim();
            const childBags = _childBags.split(",").map((bag) => {
                bag = bag.trim();
                if (bag === "no other bag") {
                    return null;
                }
                let _bag = bag.split(" ");
                return {
                    value: _bag.slice(1).join(" "),
                    quantity: Number(_bag[0]),
                } as Bag;
            });
            topBags[topBag] = {
                value: topBag,
                bags: childBags[0] === null ? null : childBags,
            } as Bag;
        });
    return topBags;
}

function countBagsInShinyGoldBag(): number {
    let count = 0;
    let stack = [];
    stack.push({ ...topBags["shiny gold bag"] });
    while (stack.length > 0) {
        const v = stack.pop() as Bag;
        if (!v.discovered) {
            v.discovered = true;
            if (v.quantity) count += v.quantity;
            v.bags?.forEach((b) => {
                for (let i = 0; i < b.quantity; i++) {
                    stack.push({ ...topBags[b.value], quantity: 1 });
                }
            });
        }
    }
    return count;
}

function containsShinyGoldBag(bag: Bag): boolean {
    if (bag.value === "shiny gold bag") return false;
    let stack = [];
    stack.push({ ...bag });
    while (stack.length > 0) {
        const v = stack.pop() as Bag;
        if (v.value === "shiny gold bag") return true;
        if (!v.discovered) {
            v.discovered = true;
            v.bags?.forEach((b) => {
                stack.push({ ...topBags[b.value] });
            });
        }
    }
    return false;
}

const topBags = parseRawInput(
    fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
);

console.log(
    "Top bags containing shiny gold bag: ",
    Object.values(topBags).filter((topBag) => containsShinyGoldBag(topBag))
        .length
);

console.log("Number of bags in shiny gold bag: ", countBagsInShinyGoldBag());
