const EventsCtrl = fw.getController('events');

module.exports = 
[
  { method: 'GET', path: '/events', options: { handler: EventsCtrl.renderMain } },
  { method: 'GET', path: '/events/add', options: { handler: EventsCtrl.renderAdd } },
  { method: 'GET', path: '/events/edit', options: { handler: EventsCtrl.renderEdit } },


  {
    method: 'POST', path: '/events/add',
      options:
      {
        handler: EventsCtrl.addEvent,
        tags: ['api'],
        validate:
        {
            payload:
            {
                name:           fw.param.string().required(),
                eventtype:      fw.param.number().required(),
                roomid:         fw.param.number().required(),
                userid:         fw.param.number().required(),
                bookDate:       fw.param.string().required(),
                starttime:      fw.param.string().required(),
                endtime:        fw.param.string().required(),
                guests:         fw.param.array().required()
            }
        }
      },
  },

  {
    method: 'POST', path: '/events/edit',
    options:
      {
        handler: EventsCtrl.editEvent,
        tags: ['api'],
        validate:
          {
            payload:
              {
                id:             fw.param.number().required(),
                name:           fw.param.string().required(),
                eventtype:      fw.param.number().required(),
                roomid:         fw.param.number().required(),
                userid:         fw.param.number().required(),
                bookDate:       fw.param.string().required(),
                starttime:      fw.param.string().required(),
                endtime:        fw.param.string().required(),
                guests:         fw.param.array().required()
              }
          }
      },
  },
  {
    method: 'POST', path: '/events/delete',
    options:
      {
        handler: EventsCtrl.deleteEvent,
        tags: ['api'],
        validate:
          {
            payload:
              {
                id:       fw.param.number().required(),
              }
          }
      }
  }
];