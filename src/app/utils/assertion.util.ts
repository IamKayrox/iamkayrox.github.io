export function assertDefined<T>(value: T, msg = "Expected value to be defined"): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new TypeError(msg);
  }
}

export function assertNumber(value: unknown, msg = "Expected value to be a number"): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError(msg);
  }
}

export function assertObject(value: unknown, msg = "Expected value to be an object"): asserts value is object {
  if (typeof value !== 'object') {
    throw new TypeError(msg);
  }
}

export function assertHasProperty<K extends keyof T, T extends Record<K, unknown>>(value: object, key: K, msg = `Expected object to have the property ${String(key)} defined`): asserts value is Pick<T, K> {
  if (!(key in value)) {
    throw new TypeError(msg);
  }
}