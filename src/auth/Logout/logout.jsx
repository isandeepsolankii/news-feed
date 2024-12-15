import { useFirebase } from "../../context/firebase";

function Logout() {
  const { Logout } = useFirebase(null);

  return (
    <div>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
}

export default Logout;
