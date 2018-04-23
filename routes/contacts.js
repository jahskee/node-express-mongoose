/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const settings = require('./utils/settings');
var Contact = require('../models/contactModel.js');

router.get('/', async function(req, res, next) {
    const contacts = await Contact.find({});  
    res.render('pages/contacts', {        
            company_name: settings.company_name,
            app_name: settings.app_name,
            contacts,        
    });
});

// form submit handler
router.post('/', function(req, res, next) {
     
    console.log('using form submit method post.');
  
    var message = 'Hello';

    //bodyparser middleware makes req.body available 
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;

    const contact = new Contact({
        firstname, lastname, phone,
    });

    contact.save()
    .then((contact) => {
        console.log(contact);
    }).catch(err => {
        message = 'error saving';
        throw err;
    });
     
    res.redirect("/");
});

module.exports = router;