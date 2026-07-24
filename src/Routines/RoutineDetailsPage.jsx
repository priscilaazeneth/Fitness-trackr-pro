import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoutines, deleteRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

import SetList from "./SetList.jsx";
import SetForm from "./SetForm";

export default function RoutineDetailsPage() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  const syncRoutine = async () => {
    const routines = await getRoutines();
    const match = routines.find((r) => r.id === Number(routineId));
    setRoutine(match);
  };

  useEffect(() => {
    syncRoutine();
  }, [routineId]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routineId);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) return <p>Loading...</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete routine</button>}
      {error && <p role="alert">{error}</p>}

      <SetList sets={routine.sets} syncRoutine={syncRoutine} />
      {token && <SetForm routineId={routine.id} syncRoutine={syncRoutine} />}
    </>
  );
}