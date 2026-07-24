import { useState } from "react";
import { deleteSet } from "../api/sets";
import { useAuth } from "../auth/AuthContext";

/** Displays the sets belonging to a routine, or a prompt to add one if there are none. */
export default function SetList({ sets, syncRoutine }) {
  if (!sets || sets.length === 0) {
    return <p>This routine has no sets yet. Add one below!</p>;
  }

  return (
    <ul>
      {sets.map((set) => (
        <SetListItem key={set.id} set={set} syncRoutine={syncRoutine} />
      ))}
    </ul>
  );
}

function SetListItem({ set, syncRoutine }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteSet(token, set.id);
      syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      {set.name} &mdash; {set.count} reps
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}