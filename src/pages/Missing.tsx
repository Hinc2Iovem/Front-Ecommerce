import { Link } from "react-router-dom";

export default function Missing() {
  return (
    <aside className="flex flex-col">
      <h1>Oops, page doesn't exist</h1>
      <Link className="block" to="/">
        Home
      </Link>
    </aside>
  );
}
