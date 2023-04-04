export function roundOff(n: number) {
    return parseFloat(n.toExponential(Math.max(1, 2 + Math.log10(Math.abs(n)))));
}
