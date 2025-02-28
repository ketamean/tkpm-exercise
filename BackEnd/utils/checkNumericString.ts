export default function checkNumericString(s: string): boolean {
    if (typeof s !== "string") return false;
    return !isNaN(s as any) && !isNaN(parseFloat(s));
}