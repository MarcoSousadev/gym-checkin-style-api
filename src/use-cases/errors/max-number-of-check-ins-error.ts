export class MaxNumberOfCheckInsReached extends Error {
  constructor(){
    super('Max number of check-ins reached')
  }
}