import "./App.css";
import Typewriter from "../lib/main";

function App() {
  return (
    <Typewriter.Container>
      <div className="text-left">
        <Typewriter.Parahraph
          className="text-8xl text-cyan-500"
          onStart={() => console.log("Start")}
          onEnd={() => console.log("End")}
          onCancel={() => console.log("Cancel")}
          onCharcter={(char) => console.log(char)}
        >
          Hello World!
        </Typewriter.Parahraph>
        <Typewriter.Parahraph className="text-lg text-gray-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
          quasi debitis commodi pariatur laborum alias hic dolorum est,
          accusamus aperiam?
        </Typewriter.Parahraph>
      </div>
    </Typewriter.Container>
  );
}

export default App;
