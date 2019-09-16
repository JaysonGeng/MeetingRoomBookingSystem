const mainCtrl = fw.getController('main');

module.exports = 
[
  { method: 'GET', path: '/main', options: { handler: mainCtrl.render } },
  { method: 'POST', path: '/main', options: { handler: mainCtrl.render } },
  { method: 'GET', path: '/register', 
        options: { 
            handler: mainCtrl.renderRegister, 
            auth: false 
          } },
  { method: 'POST', path: '/register', 
        options: { 
            handler: mainCtrl.registerAccount, 
            auth: false ,
            validate: 
            {
                payload: 
                {
                    email: fw.param.string().required(),
                    password: fw.param.string().required(),
                    name: fw.param.string().required()
                }
            }
          } }
];