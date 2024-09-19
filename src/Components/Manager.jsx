import {useRef,useState,useEffect} from "react"
import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function Manager() {
    let eye=useRef();
    let passwordRef=useRef();
    let [form,setForm]=useState({site:"",username:"",password:""});
    let [passwordsArray,setPasswordsArray]=useState([]);

    function showPassword(){
        if(eye.current.src.includes("icons/eye.svg")){
            passwordRef.current.type="password"
            eye.current.src="icons/eyecross.svg";
        }else{
            eye.current.src="icons/eye.svg";
            passwordRef.current.type="text"
        }
    }

    useEffect((()=>{
        if(localStorage.getItem("passwords")){
            // console.log(JSON.parse(localStorage.getItem("passwords")));
            setPasswordsArray(JSON.parse(localStorage.getItem("passwords")));
            // console.log(passwordsArray);
        }
    }),[])

    const copyText=(text)=>{
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    function handleChange(event){
        setForm((preform)=>{
            return {...preform,[event.target.name]:event.target.value};
        })
    }
    function savePassword(){
        if(form.site.length>3 && form.username.length>3 &&form.password.length>3){
            setPasswordsArray((preArray)=>{
                return [...preArray,form];
            })
            localStorage.setItem("passwords",JSON.stringify([...passwordsArray,form]))
            toast.success('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // console.log([...passwordsArray,form])
            setForm({site:"",username:"",password:""});
        }else{
            toast.error('Password not Saved');
        }
        
    }

    function deletePass(index){
        console.log(index.index);
        if(confirm("Do you want to delete the password")){
            setPasswordsArray((prevArray)=>{
                return prevArray.filter((ele,idx)=>{
                    if(idx!==index.index){
                        return ele;
                    }})
            })
            localStorage.setItem("passwords",JSON.stringify(passwordsArray.filter((ele,idx)=>{
                if(idx!==index.index){
                    return ele;
                }})))
                toast.success('Password Deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        }
    }

    function editPass(index){
        console.log("delete");
        setForm(passwordsArray[index.index]);
        setPasswordsArray((prevArray)=>{
            return prevArray.filter((ele,idx)=>{
                if(idx!==index.index){
                    return ele;
                }});
        })
    }


    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        ></ToastContainer>
        
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
        
        <div className="px-2 py-2 min-h-[calc(100vh-12rem)] md:mycontainer">
            <div className="text-xl font-bold cursor-pointer text-center">
                <span className="text-green-500">&lt;</span>
                Pass
                <span className="text-green-500">Fun/&gt; </span>
            </div>
            <p className="text-xl text-center text-green-700">Your own Password Manager</p>
            <div className="flex flex-col p-4 text-black items-center gap-4">
                <input  placeholder="Enter website URL " className="rounded-full border border-green-600 px-4 py-2 w-full" type="text" value={form.site} name="site" id="site" onChange={handleChange} ></input>
                <div className="flex flex-col md:flex-row relative justify-between gap-4 md:gap-12 w-full">
                    <input placeholder="Enter Username " value={form.username}className="rounded-full border py-2 border-green-600 px-4 md:w-1/2" type="text" name="username" id="username" onChange={handleChange}></input>
                    <div className="relative md:w-1/2">
                        <input ref={passwordRef} placeholder="Enter Password " value={form.password}className="rounded-full border py-2 w-full border-green-600 pl-4 pr-10" type="text" name="password" id="password" onChange={handleChange}></input>
                        <span  className="absolute right-3 top-2" onClick={showPassword}>
                            <img ref={eye} src="/icons/eye.svg"></img>
                        </span>
                    </div>
                    
                </div>
                <button onClick={savePassword} className=" flex justify-center items-center bg-green-400 hover:bg-green-300 border border-green-900 rounded-full gap-1 px-4 py-1 w-fit">
                <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover"
                >
                </lord-icon>
                Save</button>
            </div>
            <div className="passwords w-4xl">
                <h2 className="text-xl font-bold mb-4">Your Passwords</h2>
                {passwordsArray.length===0 && <div>No Passwords to Show</div>}
                {passwordsArray.length!==0 && 
                 <div className="overflow-x-auto">
                <table className="table-auto rounded-md w-4xl overflow-hidden">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 w-32">Site URL</th>
                    <th className="py-2 w-32">Username</th>
                    <th className="py-2 w-32">Password</th>
                    <th className="py-2 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                    {
                    passwordsArray.map((ele,index)=>{
                        return (
                    <tr key={index} className="w-4xl">
                    <td className=" py-2 text-center border border-white w-1/3">
                    <div className="flex gap-2 justify-center items-center">
                        <div> <a href={ele.site} target="_blank">{ele.site} </a></div>
                        <div onClick={()=>{copyText(ele.site)}} className="cursor-pointer">
                        <lord-icon 
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{width:"25px", height:"25px"}}
                        >
                        </lord-icon>
                        </div>
                        </div>
                    </td>
                    <td className="  w-32 py-2 text-center border  border-white">
                        <div className="flex gap-2 justify-center items-center">
                        <div> {ele.username}</div>
                        <div onClick={()=>{copyText(ele.username)}}  className="cursor-pointer">
                        <lord-icon 
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{width:"25px", height:"25px"}}>
                        </lord-icon>
                        </div>
                        </div>
                    </td>
                    <td className="w-32 py-2 text-center border border-white">
                        <div className="flex gap-2 justify-center items-center">
                        <div> {ele.password}</div>
                        <div onClick={()=>{copyText(ele.password)}}  className="cursor-pointer">
                        <lord-icon 
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{width:"25px", height:"25px"}}>
                        </lord-icon>
                        </div>
                        </div>
                    </td>
                    <td className="w-10 py-2 text-center border border-white">
                        <span onClick={()=>{editPass({index})}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/lzgmgrnn.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}
                            >
                        </lord-icon>                            
                        </span>
                        <span className="mx-2" onClick={()=>{deletePass({index})}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}
                            >
                        </lord-icon>
                        </span>
                    </td>
                  </tr>
                        )
                    })
                }
                </tbody>
              </table>
              </div>
                }
            </div>
        </div>
        </>   
    )
}