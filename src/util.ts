export function combinations<T>(arr: T[]): [T, T][] {
    const results: [T, T][] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            results.push([arr[i], arr[j]]);
        }
    }
    return results;
}
