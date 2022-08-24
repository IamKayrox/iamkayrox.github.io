export function boolOrDefault(val?: boolean, def: boolean = true) {
    return typeof(val) === 'boolean'? val : def;
}