//====================
// Dependencies
//====================
const roomDAO = fw.getDAO('room');
const eventDAO = fw.getDAO('event');

//====================
// Methods
//====================

async function getRooms()
{
    return await roomDAO.getRooms();
}

async function getRoomByName(email)
{
    return await roomDAO.getRoomByName(email);
}

async function getRoom(id)
{
    return await roomDAO.getRoom(id);
}

async function addRoom(data)
{
    return await roomDAO.addRoom(data);
}

async function updateRoom(data)
{
    return await roomDAO.updateRoom(data);
}

async function deleteRoom(data)
{
    return await roomDAO.deleteRoom(data);
}

async function hasArticles(data)
{
    return await roomDAO.hasArticles(data);
}

async function getTodayDashboard()
{
    var rooms = await roomDAO.getRooms();
    var todayEvents = await eventDAO.getTodayEvents();
    var returnObject = [];
    for (var i = 0; i < rooms.length; i++) {
        var newRoom = {};
        newRoom.name = rooms[i].name;;
        newRoom.events = [];3
        for (var j = 0; j < todayEvents.length; j++) {
            if(todayEvents[j].Room == newRoom.name){

                todayEvents[j].StartTime = ""+todayEvents[j].StartTime;
                todayEvents[j].EndTime = ""+todayEvents[j].EndTime;
                var startTimeDate = todayEvents[j].StartTime.split(" ")[1];
                var endTimeDate = todayEvents[j].EndTime.split(" ")[1];

                var length = 15;
                var trimmedName = todayEvents[j].Event.length > length ?
                                    todayEvents[j].Event.substring(0, length - 3) + "..." :
                                    todayEvents[j].Event;
                newRoom.events.push(
                    {
                        name: trimmedName,
                        starttime: startTimeDate,
                        endtime: endTimeDate,
                        eventType: todayEvents[j].EventType,
                        difference: diff_minutes(new Date("October 13, 2014 " + startTimeDate + ":00"), new Date("October 13, 2014 "+ endTimeDate + ":00"))
                    }
                );
            }
        }
        returnObject.push(
            newRoom
        );
    }
    return returnObject;
}

function diff_minutes(dt2, dt1)
{

var diff =(dt2.getTime() - dt1.getTime()) / 1000;
diff /= 60;
return Math.abs(Math.round(diff));

}

module.exports =
{
    getRooms,
    getRoom,
    getRoomByName,
    addRoom,
    updateRoom,
    deleteRoom,
    hasArticles,
    getTodayDashboard
}
