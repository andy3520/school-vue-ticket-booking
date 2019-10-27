const BASE_URL = "http://localhost:3000"

export const Trip = {
  TRIP_URL: BASE_URL + "/trips",

  putData: async function(url = "", data = {}) {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  deleteData: async function(url = "") {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    return res.json()
  },

  postData: async function(url = "", data = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  getData: async function(url = "") {
    const res = await fetch(url, {
      method: "GET"
    })

    return res.json()
  },

  createTrip: async function(trip) {
    const url = this.TRIP_URL
    const res = await this.postData(url, trip)

    return res
  },

  getAllTrip: async function() {
    const url = this.TRIP_URL
    const res = await this.getData(url)

    return res
  },

  getTrips: async function(from, to, date) {
    const url = `${this.TRIP_URL}/find-trips`
    const data = {
      from: from,
      to: to,
      date: date
    }
    const res = await this.postData(url, data)

    return res
  },

  saveEditTrip: async function(trip) {
    const url = this.TRIP_URL
    const res = await this.putData(url, trip)

    return res
  },

  deleteTrip: async function(id) {
    const url = `${this.TRIP_URL}/${id}`
    const res = await this.deleteData(url)

    return res
  }
}

export const Ticket = {
  TICKET_URL: BASE_URL + "/tickets",

  putData: async function(url = "", data = {}) {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  deleteData: async function(url = "") {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    return res.json()
  },

  postData: async function(url = "", data = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  getData: async function(url = "") {
    const res = await fetch(url, {
      method: "GET"
    })

    return res.json()
  },

  createTicket: async function(ticket) {
    const url = this.TICKET_URL
    const res = await this.postData(url, ticket)

    return res
  },

  getAllTicket: async function() {
    const url = this.TICKET_URL
    const res = await this.getData(url)

    return res
  },

  getTicketByPhone: async function(phone) {
    const url = `${this.TICKET_URL}/${phone}`
    const res = await this.getData(url)

    return res
  },

  saveEditTicket: async function(ticket) {
    const url = this.TICKET_URL
    const res = await this.putData(url, ticket)

    return res
  },

  deleteTicket: async function(id) {
    const url = `${this.TICKET_URL}/${id}`
    const res = await this.deleteData(url)

    return res
  }
}
