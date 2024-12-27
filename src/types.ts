export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Passenger {
  _id: string
  name: string
  trips: number
}

export interface Airline {
  id: string
  name: string
  country: string
  logo: string
  slogan: string
  head_quaters: string
  website: string
  established: string
}
