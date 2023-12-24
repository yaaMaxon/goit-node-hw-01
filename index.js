const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      // ...
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);
      break;

    case 'get':
      // ... id
      const contact = await contacts.getContactById(id);
      if(!contact) {
        throw new Error(`Product with id=${id} not found`);
      }
      return console.log(contact);
      break;

    case 'add':
      // ... name email phone
      const newContact = await contacts.addContact({name, email, phone});
      return console.log(newContact);
      break;

    case 'remove':
      // ... id
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}


const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);