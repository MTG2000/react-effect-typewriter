import "./App.css";
import Typewriter from "../lib/main";
import { useState } from "react";

function App() {
  const [updateContainer1Text, setUpdateContainer1Text] = useState(false);
  const [updateContainer2Text, setUpdateContainer2Text] = useState(false);

  return (
    <Typewriter.Container typeingSpeed={100}>
      <Typewriter.Container>
        <div className="text-left">
          <Typewriter.Parahraph
            key={updateContainer1Text ? "updated" : "not-updated"}
            className="text-8xl text-cyan-500"
          >
            {!updateContainer1Text
              ? "Hello Container 1!"
              : "Hello Container 1 Updated!"}
          </Typewriter.Parahraph>
          <Typewriter.Parahraph
            className="text-lg text-gray-300"
            typingSpeed={20}
          >
            Lorem Ipsum is simply dummy text!
          </Typewriter.Parahraph>
        </div>
      </Typewriter.Container>
      <Typewriter.Container typeingSpeed={10}>
        <div className="text-left">
          <Typewriter.Parahraph
            key={updateContainer2Text ? "updated" : "not-updated"}
            className="text-8xl text-cyan-500"
          >
            {!updateContainer2Text
              ? "Hello Container 2!"
              : "Hello Container 2 Updated!"}
          </Typewriter.Parahraph>
          <Typewriter.Parahraph className="text-lg text-gray-300">
            Lorem Ipsum is simply dummy text!
          </Typewriter.Parahraph>
        </div>
      </Typewriter.Container>

      <div className="space-x-4 mt-5">
        <button
          className="bg-blue-600 text-white p-4 "
          onClick={() => setUpdateContainer1Text((prev) => !prev)}
        >
          Update Container1 Text
        </button>
        <button
          className="bg-blue-600 text-white p-4"
          onClick={() => setUpdateContainer2Text((prev) => !prev)}
        >
          Update Container2 Text
        </button>
      </div>
    </Typewriter.Container>
  );
}

export default App;
