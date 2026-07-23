import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetailsPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActivity(activityId).then(setActivity);
  }, [activityId]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>
  );
}