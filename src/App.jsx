
import { useCallback, useState ,useEffect, useRef } from 'react'
// import "../src/App.css";
import { generate, count } from "random-words";


function App() {
  const [password,setPassword]=useState("");
  const [length,setLength]=useState(8);
  const [numbers,setNumber]=useState(false);
  const [charecters,setCharecter]=useState(false);

  const password_generator= useCallback(()=>{
    let password_data="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let passwordlist=[];
    let word="";
    length>1 ? word=generate({maxLength:Math.ceil((length/2))}) : word="";
    // console.log(word);
    passwordlist.push(word);
    if(numbers) password_data+="0123456789";
    if(charecters) password_data+="!@#$%^&*()";
    let data1 ="";
    for(let i=0; i <(length-word.length);i++){
      let data=Math.floor(Math.random()*password_data.length+1)
      passwordlist.push(password_data.charAt(data))
      
    }
    let sorted = passwordlist
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    setPassword(data1);
    // console.log();
   setPassword(
    sorted.join("")
   )
    

  },[length,numbers,charecters])
  const passwordref=useRef(null);

  useEffect(()=>{
    password_generator();
  },[length,numbers,charecters,setPassword])

  const copyoassword=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <><div className='w-full max-w-md  mx-auto px-4 my-8 shadow-md rounded-lg bg-gray-800 text-orange-600 py-3'>
      <h1 className='text-white text-center text-xl'>Pasword Generator</h1>
      <div className='shadow flex rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} readOnly className='outline-none w-full py-1 px-3' placeholder='Password' ref={passwordref}/>
        <button className='bg-blue-700 rounded outline-none shrink-0 px-3 py-0.5 text-white' onClick={copyoassword}>Copy</button>
      </div>
      <div className='flex gap-x-2 text-sm'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={1} max={100} className='cursor-pointer ' value={length} onChange={(e)=>{setLength(e.target.value)}}/><lable>length {length}</lable>
      </div>
      <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultCheckedvalue={numbers} id="numberInput" onChange={()=>{setNumber((prev)=>{return !prev})}}/><lable>Numbers</lable>
      </div>
      <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultCheckedvalue={charecters} id="characterInput" onChange={()=>{setCharecter((prev)=>{return !prev})}}/><lable>Charecters</lable>
      </div>
      </div>
      
    </div>
    </>
  )
}

export default App
