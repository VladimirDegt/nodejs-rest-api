const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");
const httpError = require("../../utils/http-error");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const getContacts = await contacts.listContacts();
      if (!getContacts) {
        throw httpError(404, "Not found");
      }
      res.json(getContacts);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const addContact = await contacts.addContact(req.body);
      if (addContact) {
        res.status(201).json(addContact);
        return;
      }
      res.status(400).json({ message: "missing required name field" });
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:contactId")
  .get(async (req, res, next) => {
    try {
      const oneContact = await contacts.getContactById(req.params.contactId);
      if (oneContact) {
        res.json(oneContact);
        return;
      }
      res.status(404).json({ message: "Not found" });
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteContact = await contacts.removeContact(req.params.contactId);
      if (deleteContact) {
        res.status(200).json({ message: "contact deleted" });
        return;
      }
      res.status(404).json({ message: "Not found" });
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updateContact = await contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (updateContact) {
        res.json(updateContact);
        return;
      }
      res.status(404).json({ message: "Not found" });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
