const contacts = require("../models/contacts");
const HttpError = require("../utils/http-error");
const ctrlWrapper = require("../utils/ctrl-wrapper");

const getAll = async (req, res) => {
  const getContacts = await contacts.listContacts();
  if (getContacts) {
    res.json(getContacts);
  }
  throw HttpError(404, "Not found");
};

const getByID = async (req, res) => {
  const oneContact = await contacts.getContactById(req.params.contactId);
  if (oneContact) {
    res.json(oneContact);
    return;
  }
  throw HttpError(404, "Not found");
};

const add = async (req, res) => {
  const addContact = await contacts.addContact(req.body);
  if (addContact) {
    res.status(201).json(addContact);
    return;
  }
  throw HttpError(404, "Not found");
};

const updateById = async (req, res) => {
  const updateContact = await contacts.updateContact(
    req.params.contactId,
    req.body
  );
  if (updateContact) {
    res.json(updateContact);
    return;
  }
  throw HttpError(404, "Not found");
};

const deleteById = async (req, res) => {
  const deleteContact = await contacts.removeContact(req.params.contactId);
  if (deleteContact) {
    res.status(200).json({ message: "contact deleted" });
    return;
  }
  throw HttpError(404, "Not found");
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByID: ctrlWrapper(getByID),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
