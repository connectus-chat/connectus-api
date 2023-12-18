import {IEventHandlerService} from '../../ports/ievent_handler_service'

export class JoinUseCase {
    constructor(private readonly eventHandler: IEventHandlerService) {}

    execute() {
        this.eventHandler.on('connection', () => {
            console.log('[WS] User connected.')
        })
    }
}
