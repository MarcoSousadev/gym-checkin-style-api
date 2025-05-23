import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase


describe('Get user prifile Use Case', ()=> {

  beforeEach(()=> {
      
     usersRepository = new inMemoryUsersRepository()
     sut = new GetUserProfileUseCase(usersRepository)

  })

  it('should be able to get user profile', async() => {
    

   const createUser = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon123@gmail.com',
      password_hash: await hash('123456', 6)

    })

    const { user } = await sut.execute({
      userId: createUser.id
  })
  

  expect(user.id).toEqual(expect.any(String))
  expect(user.name).toEqual('Jhon')
})

it('should not be able to get user profile with wrong id', async() => {
      
  

    expect(()=> sut.execute({
      userId:'non-existing-id'
    })).rejects.instanceOf(ResourceNotFoundError)

  })
})
