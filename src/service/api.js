const BASE_URL = "http://localhost:3000"

export const Trip = {
  TRIP_URL: BASE_URL + "/trips",
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
