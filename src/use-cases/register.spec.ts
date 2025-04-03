import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/users-already-exists'


describe('Register Use Case', ()=> {
  it('should be able to register', async() => {
      
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new  RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
    name:'Jhon',
    email: 'jhon123@gmail.com',
    password:'123456'
  })
  

  expect(user.id).toEqual(expect.any(String))
})

  it('should hash user password upon registration', async() => {
      
      const usersRepository = new inMemoryUsersRepository()
      const registerUseCase = new  RegisterUseCase(usersRepository)

      const { user } = await registerUseCase.execute({
      name:'Jhon',
      email: 'jhon123@gmail.com',
      password:'123456'
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to to register with the same email twice upon registration', async() => {
      
    const usersRepository = new inMemoryUsersRepository()
    const registerUseCase = new  RegisterUseCase(usersRepository)

    const email = 'jhon123@gmail.com'

    await registerUseCase.execute({
      name:'Jhon',
      email,
      password:'123456'
    })

      

      await expect(()=> 
      registerUseCase.execute({
        name:'Jhon',
        email,
        password:'123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
