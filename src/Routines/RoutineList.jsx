import { Link } from "react-router-dom";

/** Displays a list of routine names, each linking to its own details page. */
export default function RoutineList({ routines }) {
  return (
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
        </li>
      ))}
    </ul>
  );
}