import {randomUUID} from 'crypto'
import {
    Group,
    Group2Create,
    OptionalGroup,
} from '../../../domain/entities/group'
import {IGroupRepository} from '../../../domain/ports/igroup_repository'
import {users} from './local_user_repository'

export let groups: Group[] = []

export class LocalGroupRepository implements IGroupRepository {
    async create(
        adminId: string,
        newGroup: Group2Create,
    ): Promise<OptionalGroup> {
        const id = randomUUID().toString()
        const admin = users.find(u => u.id === adminId)
        if (!admin) return
        const group: Group = {
            ...newGroup,
            adminId,
            admin: admin,
            participants: [],
            id,
        }
        groups.push(group)
        return group
    }

    async update(
        id: string,
        newGroup: Partial<Group2Create>,
    ): Promise<OptionalGroup> {
        let group = await this.findById(id)
        if (!group) return
        group = {
            ...group,
            ...newGroup,
        }
        groups = [...groups.filter(g => g.id !== id), group]
        return group
    }

    async findById(id: string): Promise<OptionalGroup> {
        return groups.find(g => g.id === id)
    }

    async addParticipant(userId: string, id: string): Promise<OptionalGroup> {
        const group = await this.findById(id)
        const user = users.find(u => u.id === userId)
        if (!group || !user) return
        group.participants.push(user)
        groups = [...groups.filter(g => g.id !== id), group]
        return group
    }

    async deleteById(id: string): Promise<OptionalGroup> {
        const group = await this.findById(id)
        if (!group) return
        groups = groups.filter(g => g.id !== id)
        return group
    }

    async fetchAllByUser(userId: string): Promise<Group[]> {
        return groups.filter(g =>
            g.participants.map(p => p.id).includes(userId),
        )
    }
}
