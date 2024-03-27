import "./App.css";
import Typewriter from "../lib/main";
import { useState } from "react";

function App() {
  const [updatedText, setUpdatedText] = useState(false);

  return (
    <Typewriter.Container>
      <Typewriter.Container>
        <div className="text-left">
          <Typewriter.Parahraph
            key={updatedText ? "updated" : "not-updated"}
            className="text-8xl text-cyan-500"
            onStart={() => console.log("Start")}
            onEnd={() => console.log("End")}
            onCancel={() => console.log("Cancel")}
            onCharcter={(char) => console.log(char)}
          >
            {!updatedText ? "Hello Container 1!" : "Hello Container 1 Updated!"}
          </Typewriter.Parahraph>
          <Typewriter.Parahraph className="text-lg text-gray-300">
            Lorem Ipsum is simply dummy text!
          </Typewriter.Parahraph>
        </div>
      </Typewriter.Container>
      <Typewriter.Container>
        <div className="text-left">
          <Typewriter.Parahraph
            className="text-8xl text-cyan-500"
            onStart={() => console.log("Start")}
            onEnd={() => console.log("End")}
            onCancel={() => console.log("Cancel")}
            onCharcter={(char) => console.log(char)}
          >
            Hello Container 2!
          </Typewriter.Parahraph>
          <Typewriter.Parahraph className="text-lg text-gray-300">
            Lorem Ipsum is simply dummy text!
          </Typewriter.Parahraph>
        </div>
      </Typewriter.Container>

      <button onClick={() => setUpdatedText((prev) => !prev)}>
        Update Text
      </button>
    </Typewriter.Container>
  );
}

export default App;
