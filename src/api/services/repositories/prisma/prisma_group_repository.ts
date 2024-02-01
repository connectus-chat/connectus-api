import {
    Group,
    Group2Create,
    OptionalGroup,
} from '../../../../domain/entities/group'
import {IGroupRepository} from '../../../../domain/ports/igroup_repository'
import {prisma} from './connection'
import {generateCryptoId} from './generate_id'

export class PrismaGroupRepository implements IGroupRepository {
    async create(
        adminId: string,
        newGroup: Group2Create,
    ): Promise<OptionalGroup> {
        const createdGroup = await prisma.group.create({
            data: {...newGroup, id: generateCryptoId(), adminId},
            include: {
                admin: true,
                participants: true,
            },
        })
        return createdGroup
    }

    async update(
        id: string,
        newGroup: Partial<Group2Create>,
    ): Promise<OptionalGroup> {
        const updatedGroup = await prisma.group.update({
            data: {...newGroup},
            where: {
                id,
            },
            include: {
                admin: true,
                participants: true,
            },
        })
        return updatedGroup
    }

    async findById(id: string): Promise<OptionalGroup> {
        const foundGroup = await prisma.group.findFirst({
            where: {
                id,
            },
            include: {
                admin: true,
                participants: true,
            },
        })
        return foundGroup
    }

    async addParticipant(userId: string, id: string): Promise<OptionalGroup> {
        const updatedGroup = await prisma.group.update({
            data: {
                participants: {
                    connect: {
                        id: userId,
                    },
                },
            },
            where: {
                id,
            },
            include: {
                admin: true,
                participants: true,
            },
        })
        return updatedGroup
    }

    async deleteById(id: string): Promise<OptionalGroup> {
        const deletedGroup = await prisma.group.delete({
            where: {
                id,
            },
            include: {
                admin: true,
                participants: true,
            },
        })
        return deletedGroup
    }

    async fetchAllByUser(userId: string): Promise<Group[]> {
        const groups = await prisma.group.findMany({
            where: {
                OR: [
                    {
                        participants: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                    {
                        adminId: userId,
                    },
                ],
            },
            include: {
                admin: true,
                participants: true,
            },
        })
        return groups
    }
}
