//====================
// Dependencies
//====================
const eventDAO = fw.getDAO('event');

//====================
// Methods
//====================

async function getUpcomingEvents()
{
    return await eventDAO.getUpcomingEvents();
}

async function getTodayEvents()
{
    return await eventDAO.getTodayEvents();
}

async function addEvent(data)
{
    return await eventDAO.addEvent(data);
}

module.exports = 
{
    getUpcomingEvents,
    getTodayEvents,
    addEvent
}