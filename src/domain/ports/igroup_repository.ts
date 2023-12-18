import {
    Group,
    Group2Create,
    Group2Update,
    OptionalGroup,
} from '../entities/group'

export interface IGroupRepository {
    create(adminId: string, newGroup: Group2Create): Promise<OptionalGroup>
    update(id: string, newGroup: Group2Update): Promise<OptionalGroup>
    findById(id: string): Promise<OptionalGroup>
    addParticipant(userId: string, id: string): Promise<OptionalGroup>
    deleteById(id: string): Promise<OptionalGroup>
    fetchAllByUser(userId: string): Promise<Group[]>
}
