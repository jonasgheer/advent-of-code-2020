export function numberOfTreesHit(
    area: string[][],
    right: number,
    down: number
): number {
    let treesHit = 0;
    let [x, y] = [0, 0];

    while (y !== area.length - 1) {
        x += right;
        y += down;
        if (x >= area[0].length) x -= area[0].length;
        if (area[y][x] === "#") treesHit++;
    }

    return treesHit;
}
