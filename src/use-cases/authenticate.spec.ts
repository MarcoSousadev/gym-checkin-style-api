import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase


describe('Authenticate Use Case', ()=> {

  beforeEach(()=> {
      
     usersRepository = new inMemoryUsersRepository()
     sut = new AuthenticateUseCase(usersRepository)

  })

  it('should be able to authenticate', async() => {
    

    await usersRepository.create({
      name: 'Jhon',
      email: 'jhon123@gmail.com',
      password_hash: await hash('123456', 6)

    })

    const { user } = await sut.execute({
    email: 'jhon123@gmail.com',
    password:'123456'
  })
  

  expect(user.id).toEqual(expect.any(String))
})

it('should not be able to authenticate with wrong email', async() => {
      
  

    await expect(()=> sut.execute({
      email: 'jhon123@gmail.com',
      password:'123456'
    })).rejects.instanceOf(InvalidCredentialsError)

  })

  it('should not be able to authenticate with wrong password', async() => {
      
  

    await usersRepository.create({
      name: 'Jhon',
      email: 'jhon123@gmail.com',
      password_hash: await hash('123123', 6)

    })
  
    await expect(()=> sut.execute({
        email: 'jhon123@gmail.com',
        password:'123456'
      })).rejects.instanceOf(InvalidCredentialsError)
  
    })
})
