const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router
  .route("/")
  .get(async (req, res, next) => {
    const getContacts = await contacts.listContacts();
    res.json(getContacts);
  })
  .post(async (req, res, next) => {
    const addContact = await contacts.addContact(req.body);
    if (addContact) {
      res.status(201).json(addContact);
      return;
    }
    res.status(400).json({ message: "missing required name field" });
  });

router
  .route("/:contactId")
  .get(async (req, res, next) => {
    const oneContact = await contacts.getContactById(req.params.contactId);
    if (oneContact) {
      res.json(oneContact);
      return;
    }
    res.status(404).json({ message: "Not found" });
  })
  .delete(async (req, res, next) => {
    const deleteContact = await contacts.removeContact(req.params.contactId);
    if (deleteContact) {
      res.status(200).json({ message: "contact deleted" });
      return;
    }
    res.status(404).json({ message: "Not found" });
  })
  .put(async (req, res, next) => {
    const updateContact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (updateContact) {
      res.json(updateContact);
      return;
    }
    res.status(404).json({ message: "Not found" });
  });

module.exports = router;
