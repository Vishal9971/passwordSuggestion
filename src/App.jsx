import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_{}';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  let passwordRef = useRef(null);

  let copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-1/2 h-70 flex flex-col justify-center bg-gray-600 my-52 mx-auto rounded-xl p-3 ">
        <div className="flex flex-wrap justify-center p-2">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="w-1/2 outline text-xl p-1 rounded-lg"
          />
          <button className="outline bg-blue-400 text-black text-xl rounded-lg p-1" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-1">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length :{length}</label>
          </div>
          <div className="flex items-center gap-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className="flex items-center gap-1 ">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
