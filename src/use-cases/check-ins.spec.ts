import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-ins'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'


let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInsUseCase

describe('checkIns Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository()
    gymsRepository = new inMemoryGymsRepository()
    sut = new CheckInsUseCase(checkInsRepository, gymsRepository)

    

    await gymsRepository.create({
      
        id: 'gym-01',
        title: 'JavaScript Gym',
        description: '',
        phone:'',
        latitude: -19.98512,
        longitude: -44.0376368,
      
    })

    vi.useFakeTimers()
  })

  afterEach(()=> {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {

    

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.98512,
      userLongitude: -44.0376368
    })

     expect(checkIn.id).toEqual(expect.any(String))
  })

  
  it('should not be able to check in twice in the same day', async () => {
    
    vi.setSystemTime(new Date(2025,3, 7, 10, 52, 0 ))

      await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.98512,
      userLongitude: -44.0376368
    })

    

      await expect(() =>
       sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.98512,
      userLongitude: -44.0376368
      })
    ).rejects.toBeInstanceOf(Error)
  })
  
  it('should be able to check in twice but in different days', async () => {
    
    vi.setSystemTime(new Date(2025,3, 3, 10, 52, 0 ))

       await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.98512,
      userLongitude: -44.0376368
    })

    vi.setSystemTime(new Date(2025,3, 4, 11, 52, 0 ))

    const { checkIn } = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.98512,
        userLongitude: -44.0376368
      })
    
        expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should no be able to check in on distant gym', async () => {

    // gymsRepository.items.push({
    //   id: 'gym-02',
    //   title: 'JavaScript Gym',
    //   description: '',
    //   phone:'',
    //   latitude: new Decimal(-19.9774826
    //   ),
    //   longitude: new Decimal(-44.0247775),
    // })


       expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9774826,
      userLongitude: 44.0247775
    })).rejects.toBeInstanceOf(Error)
   
  })

})
