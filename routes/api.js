const express = require('express');
const path = require('path');
const router = express.Router();
const user = require('../model-mysql');

//User authentication
router.post('/sessions', function(req, res, next) {
 // console.log(req.body);
  let result;
  (async () =>  {
    try {
      let message = '';
      let sess = req.session;

        let post  = req.body;
        let name= post.user_name;
        let pass= post.password;

        result = await user.login(name, pass);

        if (result !== undefined) {
         // console.log("Authenticated OK");
          //res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
          req.session.userId = result.userid;
          req.session.user = result.username;
          req.session.usertype = result.usertype;
          switch(result.usertype) {
            case "admin":
              res.redirect('/users');
              break;
            case "cw":
              res.redirect('/users');
              break;
            default:
              res.redirect('/');
          }

        } else {
          res.send('Wrong credentials');
          //res.sendFile('index.html', { root: path.join(__dirname, '../public') });
        }

    } catch (e) {
      console.log(e);
    }
  })();
});

// Contract worker
router.get('/user', function(req, res, next) {
  console.log(req.session.role);
  (async () =>  {
    try {
      var role =  req.session.role;
      console.log(role);
      if(role !== "agent"){
        res.redirect("/index.html");
        return;
      }
      const clients = await agent.getClients(req.session.userId);
      res.json(clients);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.post('/user', function(req, res, next) {
  console.log(req.body.oldID + " " + req.body.newID);
  (async () =>  {
    try {
      var role =  req.session.role;
      console.log(role);
      if(role !== "admin"){
        res.redirect("/index.html");
        return;
      }
      await agent.transferAgent(req.body.oldID,req.body.newID);
    } catch (e) {
      error(res, e);
    }
  })();
});


//Events
router.get('/events', function(req, res, next) {
  console.log("get policies request received from: "+req.session.userId);
  (async () =>  {
    try {
      const policies = await client.getPolicies(req.session.userId);
  /*    if (req.session.role == "agent") {
        const policies = await client.getPolicies(req.params.id);
      } else {
        const policies = await client.getPolicies(req.session.userID);
      }*/
      res.json(policies);
    } catch (e) {
      error(res, e);
    }
  })();
});

router.post('/policies', function(req, res, next) {
  console.log("Add policy - Client_ID: " + req.body.client + " Desc: " + req.body.name + " Type: " + req.body.type + " Valid: " + req.body.valid);
  (async () =>  {
    try {
      //client, name, type, valid
      await client.addPolicy(req.body.client, req.body.name, req.body.type, req.body.valid) ;
    } catch (e) {
      error(res, e);
    }
  })();
});

router.delete('/policies', function(req, res, next) {
  console.log("Delete policy - ID: " + req.body.policyID);
  (async () =>  {
    try {
      //client, name, type, valid
      client.deletePolicy(req.body.policyID) ;
    } catch (e) {
      error(res, e);
    }
  })();
});



module.exports = router;
