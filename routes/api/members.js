const express = require('express')
const router = express.Router()
const members = require('../../members')
const uuid = require('uuid')
const mongooes = require('mongoose')
const logger = require('../../middleware/logger')
const MemberModel = mongooes.model('members')

/**
 * GETs all members 
 * 1. science we use /api/members in app.use inside the index.js file so no need to
 * write (app.get('/api/members') & app.get('/api/members/:id))
 * instead we can use app.get('/') and app.get('/:id')
 * 2. previously we (use app.get) but when we use router we can us (router.get)
 */
router.get('/', (req, res) => {
    //Getting
    MemberModel.find((error, docs) => {
        if (!error) {
            console.log('docs->', docs)
            res.json(docs)
        } else {
            console.log('list error -> ', error);
        }
    })
})

// GETs single members
router.get('/:id', (req, res) => {
    MemberModel.find((error, docs) => {
        if (!error) {
            console.log('docs->', docs)
            const fount = docs.some(member => member.id === req.params.id)
            if (fount) {
                res.json(docs.filter(member => member.id === req.params.id))
            } else {
                res.status(400).json({message: `No member with  the id of ${req.params.id}`}) 
            }
        } else {
            console.log('single list error -> ', error);
        }
    })
})

// CREATE member
router.post('/', (req, res) => {
    console.log('req--->', req.body);
    let member = new MemberModel();
    member.id = uuid.v4();
    member.name = req.body.name;
    member.email = req.body.email;
    member.status = 'Active'

    if(!member.name || !member.email) {
        res.status(400).json({message: 'Please include name and email'})
    } else {
        member.save((error, docs) => {
        if(!error) {
            res.json(member)
        } else {
            res.json('Error Occured')
        }
    })
    }
})

// UPDATE member
router.put('/:id', (req, res) => {
    MemberModel.find((error, docs) => {
        if (!error) {
            console.log('docs->', docs)
            console.log('req.params.id :', req.params.id);
            const fount = docs.some(member => member.id === req.params.id)
            console.log('fount:', fount);
            if (fount) {
                const updMember = req.body;
                docs.forEach(member => {
                    if (member.id === req.params.id) {
                        member.name = updMember.name ? updMember.name : member.name
                        member.email = updMember.email ? updMember.email : member.email
                        member.save((error, docs) => {
                        if(!error) {
                            res.json({message: 'Member updated', member})
                        } else {
                            res.json('Error Occured')
                        }
                    })
                    }
                })
            } else {
                res.status(400).json({message: `No member with  the id of ${req.params.id}`}) 
            }
        } else {
            console.log('UPDATE member error -> ', error);
        }
    })    
})

// DELETE member
router.delete('/:id', (req, res) => {
    MemberModel.findOneAndRemove({id: req.params.id}, (error, result) => {
        if(error) {
            res.status(500).json({message: error})
        } else {
            if(result){
                res.json({
                message: 'Member deleted',
                members:  result
            });
            } else {
                res.status(404).json({message: `No member with  the id of ${req.params.id}`})
            }
        }
    })
})

module.exports = router;