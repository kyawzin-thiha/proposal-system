import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.account.upsert({
        where: {
            username: 'admin',
        },
        update: {},
        create: {
            username: 'admin',
            password: 'admin',
            role: 'ADMIN',
            user: {
                create: {
                    name: 'Admin',
                },
            },
        },
    });
}

main()
    .catch(() => process.exit(1))
    .finally(async () => await prisma.$disconnect());
