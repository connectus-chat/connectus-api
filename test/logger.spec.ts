import { randomBytes } from "crypto";
import { Logger } from "../src/api/services/Logger";

describe('Logger types', () => {

    it('Should show a WS log', () => {
        Logger.websocketLog('Log', 'Fazendo', randomBytes(64).toString('hex'));
        Logger.cryptoLog('Chave recebida', 'Criptografando', randomBytes(64).toString('hex'));
        Logger.operationLog('Título', 'Lorem ipsum', 'hahahaha')
    })
});