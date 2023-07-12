const fs = require("fs").promises;

const contactsPath = "./db/contacts.json";

function listContacts() {
  return fs.readFile(contactsPath).then((data) => {
    return JSON.parse(data.toString());
  });
}

function getContactById(contactId) {
  return listContacts().then((list) => {
    return list.find((contact) => contact.id === contactId);
  });
}

function removeContact(contactId) {
  return listContacts().then((list) => {
    const filteredList = list.filter((contact) => contact.id !== contactId);
    return fs
      .writeFile(contactsPath, JSON.stringify(filteredList))
      .then(() => `Contact with id ${contactId} was successfully removed.`);
  });
}

function addContact(name, email, phone) {
  return listContacts().then((list) => {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updatedList = [...list, newContact];
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedList))
      .then(() => newContact);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
