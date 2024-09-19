export default function Navbar(){
    return (
        <nav className="bg-slate-800  text-white">
            <div className="mycontainer flex h-18 justify-between items-center px-8 py-4">

                <div className="text-2xl font-bold cursor-pointer ">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">Fun/&gt; </span>
                </div>
            {/* <ul >
                <li className=" flex gap-4">
                    <a className="hover:font-bold" href="/"  >Home</a>
                    <a className="hover:font-bold" href="#" >About</a>
                    <a className="hover:font-bold" href="#" >Contact</a>
                </li>
            </ul> */}
                <button className="bg-green-500 px-2 rounded-full h-12 flex justify-center items-center ring-1 ring-white">
                    <img src="/icons/github.png" className="invert h-7" alt="Github Image"></img>
                    <span className=" font-bold text-lg leading-3 px-1">Github</span>
                </button>
            </div>
            

        </nav>
    )
}