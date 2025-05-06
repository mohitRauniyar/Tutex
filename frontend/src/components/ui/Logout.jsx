import { BiLogOut } from "react-icons/bi";

export default function Logout({ handleLogout,disabled }) {
  return (
    <div
      className="h-15 w-full bg-white px-8 py-5 border-b-2 border-gray-200  
        text-xl cursor-pointer text-[#ff0000] font-semibold"
      onClick={disabled?null:handleLogout}
    >
      <div className="p-2 w-fit -mt-2 rounded-lg flex gap-4 items-center">
        <BiLogOut />

        <p>Logout</p>

      </div>
    </div>
  );
}
