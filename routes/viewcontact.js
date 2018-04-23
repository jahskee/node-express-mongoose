/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var settings = require('./utils/settings');
var Contact = require('../models/contactModel.js');

headerText = {
    company_name: settings.company_name,
    app_name: 'NodeJS Express',
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const _id = req.query.id;
    const contact = await Contact.findOne({_id}); 
    const message = req.query.updated?'Account Successfully Updated!':'';
    res.render('pages/viewcontact', {
        ...headerText,
        contact,
        message,
    });
});

/* GET users listing. */
router.post('/', async function(req, res, next) {
    const submit = req.body.submit;
    const _id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    
    let contact = await Contact.findOne({_id});

    if (submit === 'update') {
        contact.set({firstname, lastname, phone});
        contact.save();
        res.redirect("/viewcontact?id="+_id+'&updated=true');
    } else if (submit === 'delete') {
        contact.remove();
        const message = 'Account Successfully Deleted!';
        res.render('pages/confirm_delete_contact', {
            ...headerText,
            contact,
            message,
        });
    }
    
});

module.exports = router;