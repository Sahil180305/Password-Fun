

export default function Footer(){
    return (
        <footer className="bg-slate-800  text-white sticky w-full">
            <div className="flex flex-col h-20 justify-between items-center px-8 py-2" >
                <div className="text-2xl font-bold cursor-pointer ">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">Fun/&gt; </span>
                </div>
                <div className="flex">
                    <span>Made with</span><img src="/icons/heart.png" className="w-8 px-1"></img><span>by Sahil</span>
                </div>
            </div>
        </footer>
        
    )
}