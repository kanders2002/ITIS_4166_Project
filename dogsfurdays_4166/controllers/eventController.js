const model = require('../models/event');

//get /events: send all events to the user
exports.index = (req, res, next)=>{
    //res.send('index');
    model.find()
    .then(events=>res.render('./event/connections', {events}))
    .catch(err=>next(err));
};

//GET /events/new: send HTML form for creating a new story
exports.new = (req, res)=> {
    res.render('./event/newConnection')
};

//GET /events/about: send html about
exports.about = (req, res)=> {
    res.render('/events')
};

//GET /events/contact: send HTML contact
exports.contact = (req, res)=> {
    res.render('./contact')
};

//POST /events: create a new event
exports.create = (req, res, next)=> {
    //res.send('Created a new event');
    let event = new model(req.body); //create a new event document
    event.save() //insert document to database
    .then(event=>res.redirect('/events'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

//GET /events/:id: send details of story identified by id
exports.show = (req, res, next)=> {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event=>{
        if(event) {
            res.render('./event/connection', {event})
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//GET /events/:id/edit: send html form for editing an existing story
exports.edit = (req, res, next)=> {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(event=>{
        if(event) {
            res.render('./event/edit', {event})
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//PUT /events/:id: update update the story identified by id
exports.update = (req, res, next)=> {
    //res.send('update story with id ' + req.params.id);
    let event = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, event, 
        {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event) {
            res.redirect('/events/'+id);
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

//DELETE /events/:id: delete the story identified by id
exports.delete = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Event ID');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event) {
            res.redirect('/events');
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};