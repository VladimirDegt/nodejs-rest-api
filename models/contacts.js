const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const validateContacts = require("../utils/validate-contacts");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const getContacts = await fs.readFile(contactsPath);
  return JSON.parse(getContacts);
};

const getContactById = async (contactId) => {
  const getContacts = await listContacts();
  const oneContact = getContacts.find((item) => item.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const getContacts = await listContacts();
  const deleteContact = getContacts.find((item) => item.id === contactId);
  const updateContacts = getContacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return deleteContact || null;
};

const addContact = async ({ name, email, phone }) => {
  const error = validateContacts(name, email, phone);
  if (error) {
    console.log(error.details[0].message);

    return null;
  }

  const getContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  getContacts.push(newContact);
  console.table(getContacts);
  fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const error = validateContacts(name, email, phone);
  if (error) {
    console.log(error.details[0].message);

    return null;
  }

  const getContacts = await listContacts();
  const index = getContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  getContacts[index] = { contactId, name, email, phone };
  fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));
  return getContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
