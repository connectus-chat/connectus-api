import {User} from './user'

export interface Credentials {
    publicKey: string
    userId: string
    user: User
}

export type Credentials2Create = Pick<Credentials, 'publicKey'>
