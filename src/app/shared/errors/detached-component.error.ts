export class DetachedElementError extends Error {
    constructor() {
        super('The provided element is not attached to any desktop');
    }
}