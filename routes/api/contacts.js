const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const getContacts = await contacts.listContacts();
  res.json(getContacts)
})

router.get('/:contactId', async (req, res, next) => {
  const oneContact = await contacts.getContactById(req.params.contactId)
  if(oneContact) {
    res.json(oneContact)
    return
  }
  res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const addContact = await contacts.addContact(req.body)
  if(addContact) {
    res.status(201).json(addContact)
    return
  }
  res.status(400).json({ message: 'missing required name field' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
