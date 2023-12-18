export class HttpError extends Error {
    private _status: number

    constructor(message = 'Houve um erro no servidor', status = 400) {
        super(message)
        this._status = status
        Object.setPrototypeOf(this, HttpError.prototype)
    }

    public get status() {
        return this._status
    }
}
