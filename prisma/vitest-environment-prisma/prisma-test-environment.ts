import { prisma } from '@/lib/prisma'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import type { Environment }  from 'vitest/environments'


function generateDataBaseUrl(schema: string){
  if (!process.env.DATABASE_URL){
    throw new Error ('Please provide a DATABASE_URL env variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {

    const schema = randomUUID()
    const databaseUrl = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    console.log(databaseUrl)


    execSync(`npx prisma migrate deploy --schema=prisma/schema.prisma`)

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )

        await prisma.$disconnect()
      }
    }
  }
}