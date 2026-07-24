import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import { createSet } from "../api/sets";
import { useAuth } from "../auth/AuthContext";

/** Form for a logged-in user to add a set (activity + reps) to a routine. */
export default function SetForm({ routineId, syncRoutine }) {
  const { token } = useAuth();

  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const tryCreateSet = async (formData) => {
    setError(null);

    const activityId = Number(formData.get("activityId"));
    const count = Number(formData.get("count"));

    try {
      await createSet(token, { activityId, routineId, count });
      syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a set to this routine</h2>
      <form action={tryCreateSet}>
        <label>
          Activity
          <select name="activityId" required>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reps
          <input type="number" name="count" required />
        </label>
        <button>Add set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}