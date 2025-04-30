export default function Logout({handleLogout}){
    return (
        <div className="h-15 w-full bg-white px-8 py-5 border-b-2 border-gray-200  
        text-xl cursor-pointer text-[#ff0000]" onClick={handleLogout}>Logout</div>
      );
}