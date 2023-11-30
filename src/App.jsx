import { useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [length,setLength]=useState(8)
  const [numric,setNumric]=useState(false)
  const [spechar,setSpechar]=useState(false)
  const passwordRef = useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass= ""
    let str= ""
    str="ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnopqrstuvwxyz"
    if(numric==true) str=str+"0123456789"
    if(spechar==true) str=str+"!@#$%^&*()"

    for (let i = 1; i < length; i++) {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  },[length,numric,spechar,setpassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numric,spechar,passwordGenerator])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} placeholder="Password" readOnly className='outline-none w-full py-1 px-3' ref={passwordRef}/>
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" value={length} min={8} max={100} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numric} id="numberInput" onChange={()=>{setNumric((prev)=> !prev)}}/>
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={spechar} id="characterInput" onChange={()=>{setSpechar((prev)=>!prev)}}/>
        <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
