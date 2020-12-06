export function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    let _union = new Set<T>(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}

export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    let _intersection = new Set<T>();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
