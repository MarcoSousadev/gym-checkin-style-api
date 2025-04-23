import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
      
    })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -19.98512,
      longitude: -44.0376368,
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -19.8545956,
      longitude: -43.9582337,
     
    })
    

    const { gyms } = await sut.execute({
      userLatitude: -19.98512,
      userLongitude: -44.0376368
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
    expect.objectContaining({title: 'Near gym'})
    ])
  })

   

  

})
