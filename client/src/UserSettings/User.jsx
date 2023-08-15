import {
  Link,
  Outlet,
  useLoaderData,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./User.css";
import { FaUserAlt, FaTag } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export async function userSettingsLoader({ params }) {
  const userResponse = await fetch(`/api/user/get_user/${params.id}`);
  const user = await userResponse.json();
  return { user };
}


export default function UserSettings() {
  const { user } = useLoaderData();
  return (
    <div className="body">
      <div className="container">
        <div className="leftbox">
          <nav className="nav">
            <Link to={`/user/${user.UserId}/settings/account`} className="tab">
              <FaUserAlt className="fa-user" />
            </Link>
            <Link to={`/user/${user.UserId}/settings/tags`} className="tab">
              <FaTag className="fa-user" />
            </Link>

            <Link to={`/user/${user.UserId}/settings/delete`} className="tab">
              <AiFillDelete className="fa-cog" />
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
