import { v4 } from "uuid";

const storageIdentifier = "blujut";

export const getUserToken = () => {
  const userToken = localStorage.getItem(storageIdentifier);

  if (userToken) {
    return userToken;
  } else {
    const newToken = v4();
    localStorage.setItem(storageIdentifier, newToken);

    return newToken;
  }
};
