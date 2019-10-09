//= ===================
// Dependencies
//= ===================
const eventService = fw.getService('event')
const eventTypeService = fw.getService('eventType')
const userService = fw.getService('user')
const roomService = fw.getService('room')

//= ===================
// Methods
//= ===================
/**
 * Render Main page
 * @param {Object} request
 * @param {Object} h
 */

function renderEdit (request, h) {
  return fw.promise(async (resolve, reject) => {
    const event = await eventService.getEventsById(request.query.id)
    if (event.length != 1) {
      resolve(h.redirect('/events'))
      return
    }

    resolve(h.view('views/events/edit',
      {
        eventTypes: await eventTypeService.getEventTypes(),
        users: await userService.getUsers(),
        rooms: await roomService.getRooms(),
        event: event[0],
        session: request.auth.credentials
      }))
  })
}
function renderMain (request, h) {
  return fw.promise(async (resolve, reject) => {
    const events = await eventService.getTodayEvents()
    resolve(h.view('views/events/main', {
      events,
      session: request.auth.credentials
    }))
  })
}

/**
 * Render Add page
 * @param {Object} request
 * @param {Object} h
 */

function renderAdd (request, h) {
  return fw.promise(async (resolve, reject) => {
    resolve(h.view('views/events/add',
      {
        session: request.auth.credentials,
        eventTypes: await eventTypeService.getEventTypes(),
        users: await userService.getUsers(),
        rooms: await roomService.getRooms()
      }))
  })
}

function addEvent (request, h) {
  return fw.promise(async (resolve, reject) => {
    let stResponse = { success: false, message: '' }

    const Params =
      {
        name: request.payload.name,
        eventtype: request.payload.eventtype,
        roomid: request.payload.roomid,
        userid: request.payload.userid,
        bookDate: request.payload.bookDate,
        starttime: request.payload.starttime,
        endtime: request.payload.endtime,
        guests: request.payload.guests
      }

    await eventService.addEvent(Params)
    stResponse.success = true
    resolve(stResponse)
  })
}

function editEvent (request, h) {
  return fw.promise(async (resolve, reject) => {
    let stResponse = { success: false, message: '' }
    const event = await eventService.getEventsById(request.payload.id)
    if (event.length !== 1) {
      stResponse.message = 'Event does not exist'
      resolve(stResponse)
      return
    }
    const Params =
      {
        name: request.payload.name,
        eventtype: request.payload.eventtype,
        roomid: request.payload.roomid,
        userid: request.payload.userid,
        bookDate: request.payload.bookDate,
        starttime: request.payload.starttime,
        endtime: request.payload.endtime,
        guests: request.payload.guests
      }

    await eventService.addEvent(Params)
    await eventService.deleteEvent(request.payload.id)
    stResponse.success = true
    resolve(stResponse)
  })
}

function deleteEvent (request, h) {
  return fw.promise(async (resolve, reject) => {
    let stResponse = { success: false, message: '' }
    const event = await eventService.getEventsById(request.payload.id)
    if (event.length != 1) {
      stResponse.message = 'Event does not exist'
      resolve(stResponse)
      return
    }

    await eventService.deleteEvent(request.payload.id)
    stResponse.success = true
    resolve(stResponse)
  })
}
module.exports =
  {
    renderMain: renderMain,
    renderAdd: renderAdd,
    addEvent: addEvent,
    renderEdit: renderEdit,
    deleteEvent: deleteEvent,
    editEvent: editEvent
  }
