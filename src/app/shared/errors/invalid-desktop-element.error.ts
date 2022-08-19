export class InvalidDesktopElementError extends Error {
    constructor(id: string) {
        super(`The html element whit desktop-id ${id} doesn't correspond to a registered desktop`);
    }
}