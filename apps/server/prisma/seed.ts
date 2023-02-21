import { Prisma, PrismaClient } from '@prisma/client'
import { randomInt } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const oms = await prisma.organization.create({
    data: {
      shortName: "OMS l'Arbresle",
      fullName: "Office Municipal des Sports de l'Arbresle",
    },
  })

  const bca = await prisma.collective.create({
    data: {
      shortName: 'BCA',
      fullName: 'Basket Club de l’Arbresle',
      logo: 'https://picsum.photos/200',
    },
  })

  const abc = await prisma.collective.create({
    data: {
      shortName: 'ABC',
      fullName: "L'Arbresle Badminton Club",
      logo: 'https://picsum.photos/201',
    },
  })

  const aline = await prisma.user.create({
    data: {
      email: 'aline.clairet@oms.fr',
      firstName: 'Aline',
      lastName: 'Clairet',
      password: '123456',
    },
  })

  const antoine = await prisma.user.create({
    data: {
      email: 'antoine.sabouret@oms.fr',
      firstName: 'Antoine',
      lastName: 'Sabouret',
      password: '123456',
    },
  })

  await prisma.collectiveToUser.createMany({
    data: [
      {
        collectiveId: bca.id,
        userId: aline.id,
      },
      {
        collectiveId: abc.id,
        userId: antoine.id,
      },
    ],
  })

  await prisma.organizationToCollective.createMany({
    data: [
      {
        organizationId: oms.id,
        collectiveId: bca.id,
      },
      {
        organizationId: oms.id,
        collectiveId: abc.id,
      },
    ],
  })

  const grandChamps = await prisma.building.create({
    data: {
      name: 'Grand-champs',
      address: 'Rue de la Paix, 69210 Sain-bel',
      rooms: {
        create: [
          {
            name: "Salle d'escalade",
            description: 'Escalade uniquement',
            pictures: ['https://picsum.photos/202'],
            capacity: 20,
          },
          {
            name: 'Salle de réunion',
            description: '10 tables, 20 chaises',
            pictures: ['https://picsum.photos/203'],
            capacity: 20,
          },
          {
            name: 'Gymnase multi-sports',
            description: 'Hauteur de plafond: 13m',
            pictures: ['https://picsum.photos/204'],
            capacity: 100,
          },
        ],
      },
    },
    include: {
      rooms: true,
    },
  })

  const grolier = await prisma.building.create({
    data: {
      name: 'Grolier',
      address: "Rue de la Paix, 69210 L'Arbresle",
      rooms: {
        create: [
          {
            name: 'Gymnase',
            description: 'Salle multi-sport',
            pictures: ['https://picsum.photos/200'],
            capacity: 100,
          },
          {
            name: 'Dojo',
            description: 'Art-martiaux',
            pictures: ['https://picsum.photos/201'],
            capacity: 20,
          },
        ],
      },
    },
    include: {
      rooms: true,
    },
  })

  const bookings: Prisma.BookingCreateManyArgs["data"] = []

  for (const d = new Date(2023, 0, 1); d <= new Date(2023, 11, 31); d.setDate(d.getDate() + 1)) {
    for (const room of grandChamps.rooms.concat(grolier.rooms)) {
      for (let i = 0; i < randomInt(0, 3); i++) {
        const startingHourDate = new Date(d)

        startingHourDate.setHours(randomInt(8, 20))
        startingHourDate.setMinutes(0)
        startingHourDate.setSeconds(0)
        startingHourDate.setMilliseconds(0)

        const endingHourDate = new Date(startingHourDate.getTime() + randomInt(1, 3) * 3600000)

        bookings.push({
          title: 'Réservation de la salle',
          approved: true,
          numberOfPeople: randomInt(1, 20),
          description: 'Réservation générique de test',
          start: startingHourDate,
          end: endingHourDate,

          roomId: room.id,
          collectiveId: randomInt(2) === 1 ? bca.id : abc.id,
        })
      }
    }
  }

  await prisma.booking.createMany({
    data: bookings,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
