'use strict';
const authModel = require('../models/auth.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const loginUser = (req, res, next) => {
  if(!req.body) {
    req.status(400).send({
      code: 400,
      message: "content cannot be empty"
    })
  }
  var password = req.body.password;
  authModel.loginUser(req.body, async (err, data) => {
    if(err) {
      res.status(500).send({
        code: 500,
        message: 
        err.message || 'Some error occurred while creating the Customer'
      })
    } else {
      if(data.length == 0) {
        res.status(401).send({
          code: 401,
          message: "UnAuthorized User"
        })
      } else if(data.length>0) {
        const comparisionPwd = await bcrypt.compare(password, data[0].password);
        if(comparisionPwd) {
          var token = jwt.sign({userID: data.userID}, process.env.SECRET_KEY, { expiresIn: '2h' });
          res.status(200).send({
            code: 200, token});
        } else {
          res.status(409).send({
            code:409,
            message: "Username and Password does not match"
          })
        }
      }
    }
  })

}

module.exports = {
  login: loginUser
}