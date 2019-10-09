//= ===================
// Dependencies
//= ===================
const eventDAO = fw.getDAO('event')

//= ===================
// Methods
//= ===================

async function getUpcomingEvents () {
  return await eventDAO.getUpcomingEvents()
}

async function getTodayEvents () {
  return await eventDAO.getTodayEvents()
}

async function addEvent (data) {
  return await eventDAO.addEvent(data)
}

async function updateEvent (data) {
  await eventDAO.deleteEvent(data.id)
  return await eventDAO.addEvent(data)
}

async function deleteEvent (data) {
  return await eventDAO.deleteEvent(data)
}
async function getEventsById (id) {
  return await eventDAO.getEventsById(id)
}
module.exports =
  {
    getUpcomingEvents,
    getTodayEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsById
  }
