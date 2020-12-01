export function findExpenseReportError2n(nums: number[]): number | undefined {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === 2020) {
                return nums[i] * nums[j];
            }
        }
    }
}

export function findExpenseReportError3n(nums: number[]): number | undefined {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 2020) {
                    return nums[i] * nums[j] * nums[k];
                }
            }
        }
    }
}
