const API = import.meta.env.VITE_API;

/**
 * Sends a new set to the API to be added to a routine.
 * A valid token is required.
 */
export async function createSet(token, set) {
  if (!token) {
    throw Error("You must be signed in to add a set to a routine.");
  }

  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the set with the given ID.
 * A valid token is required.
 */
export async function deleteSet(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a set.");
  }

  const response = await fetch(API + "/sets/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}