// contacts.js
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async() => {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async(contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if(!result) {
    return null;
  }
  return result;
}

const removeContact = async(contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

const addContact = async(data) => {
  // ...твій код. Повертає об'єкт доданого контакту. 
  const contacts = await listContacts(); 
  const newContact = {...data, id: nanoid()}
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}


module.exports = {
     listContacts,
     getContactById,
     removeContact,
     addContact,
};