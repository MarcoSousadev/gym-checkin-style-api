import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'


let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
      
    })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'javascript gym',
      description: null,
      phone: null,
      latitude: -19.9774826
          ,
     longitude: -44.0247775,
    })

    await gymsRepository.create({
      title: 'typescript gym',
      description: null,
      phone: null,
      latitude: -19.9774826
          ,
     longitude: -44.0247775,
    })
    

    const { gyms } = await sut.execute({
    query: 'javascript',
    page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'javascript gym'})
    ])
  })

    it('should be able to fetch paginated gym search', async () => {

      for(let i = 1; i <= 22; i++) {
        await gymsRepository.create({
          title: `javascript gym ${i}`,
      description: null,
      phone: null,
      latitude: -19.9774826
          ,
     longitude: -44.0247775,
        })
      }


    const { gyms } = await sut.execute({
     query: 'javascript',
     page: 2
     
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'javascript gym 21'}),
      expect.objectContaining({title: 'javascript gym 22'})
    ])
  })


  

})
