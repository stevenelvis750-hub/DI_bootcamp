import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userthunks";

export default function UserData() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Data</h2>

      <button onClick={() => dispatch(fetchUser(1))}>Fetch User</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data.id && (
        <ul>
          <li><strong>Name:</strong> {data.name}</li>
          <li><strong>Username:</strong> {data.username}</li>
          <li><strong>Email:</strong> {data.email}</li>
          <li><strong>Phone:</strong> {data.phone}</li>
          <li><strong>Website:</strong> {data.website}</li>
        </ul>
      )}
    </div>
  );
}