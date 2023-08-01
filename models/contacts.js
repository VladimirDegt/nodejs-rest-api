const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const getContacts = await fs.readFile(contactsPath);
  return JSON.parse(getContacts);
}

const getContactById = async (contactId) => {
  const getContacts = await listContacts();
  const oneContact = getContacts.find(item => item.id === contactId)
  return oneContact || null
}

const removeContact = async (contactId) => {
  const getContacts = await listContacts();
  const deleteContact = getContacts.find(item => item.id === contactId);
  const updateContacts = getContacts.filter(item => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return deleteContact || null;
}

const addContact = async ({name, email, phone}) => {
  const getContacts = await listContacts();
  if(name && email && phone) {
    const newContact = { id: nanoid(), name, email, phone };
    getContacts.push(newContact);
    console.table(getContacts);
    fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));

    return newContact;
  }
  return null;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const getContacts = await listContacts();
  if(name && email && phone) {
    const index = getContacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    getContacts[index] = { contactId, name, email, phone };
    fs.writeFile(contactsPath, JSON.stringify(getContacts, null, 2));
    return getContacts[index];
  }
  return null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
