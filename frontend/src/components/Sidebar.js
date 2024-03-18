import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

function SidebarIcon({ icon, path }) {
  return (
    <Link
      to={path}
      className="relative flex justify-center items-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-gray-600"
    >
      {icon}
    </Link>
  );
}

export function Sidebar() {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col items-center justify-between  bg-gray-900 text-white shadow-lg ">
      <div className="flex flex-col items-center">
        <img
          className="w-12 h-12 rounded-full mt-6 mb-2 mx-auto shadow-lg"
          src={`https://gravatar.com/avatar/${user.avatar_hash}`}
          alt="profile-avatar"
        />
        <SidebarIcon icon={<FaHome size={32} />} path="/" />
        <SidebarIcon icon={<AiFillProject size={28} />} path="/project" />
      </div>
      <div className="flex justify-center items-center mb-3">
        <SidebarIcon icon={<IoLogOutOutline size={28} />} />
      </div>
    </div>
  );
}
