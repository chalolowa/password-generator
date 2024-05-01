import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%&*?|\/_+=-"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])
  
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  const passwordRef = useRef(null)

  const copyPasswordClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <>
      <div className='w-full h-screen'>
        <h1 className='text-white text-center py-2 mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg mb-4 justify-center items-center'>
          <input className='outline-none w-full py-1 px-3' type='text' value={password} ref={passwordRef} placeholder='Password' read />
          <button className='outline-none bg-blue-700 shrink-0' onClick={copyPasswordClipboard}>Copy</button>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="range" value={length} className='cursor-pointer' min={6} max={90} onChange={(e)=> setLength(e.target.value)} />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} name="" id="" 
          onChange={()=> setNumberAllowed((prev)=> (!prev))} />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} name="" id="" 
          onChange={()=> setCharAllowed((prev)=> (!prev))} />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </>
  )
}

export default App
