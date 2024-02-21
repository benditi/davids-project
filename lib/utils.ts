import * as Contacts from "expo-contacts";

export function formatAddress(address: Contacts.Address) {
  let stringArray = [];
  if (address.country) {
    stringArray.push(address.country);
  }
  if (address.city) {
    stringArray.push(address.city);
  }
  if (address.street) {
    stringArray.push(address.street);
  }
  return stringArray.join(", ");
}
