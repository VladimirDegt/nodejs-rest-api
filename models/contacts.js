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

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
