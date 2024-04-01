## React Effect Typewriter

Create engaging typewriter effects in your React apps with the react-effect-typewriter library. This package contains two main components - Paragraph and Container. Paragraph is a component that animates your text to appear one character at a time on mount. Container is a wrapper component that can hold multiple Paragraph components and can control the animation order of its children.

### Installation

```bash
npm install react-effect-typewriter
```

### Usage

Import the Paragraph and Container components from the library like so:

```javascript
import Typewriter from "react-effect-typewriter";
```

#### Paragraph Component

The Paragraph component can take the following props:

```typescript
interface ParagraphProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
  typingSpeed?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onCancel?: () => void;
  onCharacter?: (char: string) => void;
}
```

`children`: The text content you wish to animate.
`typingSpeed`?: (Optional) The speed with which the characters are typed. Defined in milliseconds.
`onStart`?: (Optional) A callback that is triggered when the typing animation starts.
`onEnd`?: (Optional) A callback that is triggered when the typing animation ends.
`onCancel`?: (Optional) A callback that is triggered if the typing animation is cancelled.
`onCharacter`?: (Optional) A callback that is triggered each time a character is typed. The typed character is passed as an argument to this function.

#### Container Component

The Container component can take the following props:

```typescript
interface ContainerProps {
  children: React.ReactNode;
  typingSpeed?: number;
  delayBetweenElements?: number;
  enableLogs?: boolean;
}
```

`children`: The child elements (either Paragraph components or other Container components) that you want to animate.
`typingSpeed`?: (Optional) This speed overwrites the typingSpeed prop in child Paragraph components.
`delayBetweenElements`?: (Optional) The delay between the start of the animation of each child element. Defined in milliseconds.
`enableLogs`?: (Optional) If set to true, this will enable logs that can be useful for debugging purposes.

### Example Usage

Here is an example showcasing the usage of the Paragraph and Container components.

```jsx
import Typewriter from "react-effect-typewriter";

function App() {
  return (
    <Typewriter.Container typingSpeed={100} delayBetweenElements={1500}>
      <Typewriter.Paragraph>Hello, World!</Typewriter.Paragraph>
      <Typewriter.Paragraph typingSpeed={20}>
        Lorem Ipsum is simply dummy text!
      </Typewriter.Paragraph>
    </Typewriter.Container>
  );
}
```

### Nested Containers

One can also have nested Container components, for more complex animation sequences.

```jsx
import Typewriter from "react-effect-typewriter";
import { useState } from "react";

function App() {
  const [updatedText, setUpdatedText] = useState(false);

  return (
    <Typewriter.Container typingSpeed={100} delayBetweenElements={1500}>
      <Typewriter.Container delayBetweenElements={1000}>
        <Typewriter.Paragraph className="text-8xl text-cyan-500">
          {!updatedText ? "Hello, World!" : "Hello, Updated World!"}
        </Typewriter.Paragraph>
        <Typewriter.Paragraph
          className="text-lg text-gray-300"
          typingSpeed={20}
        >
          Lorem Ipsum is simply dummy text!
        </Typewriter.Paragraph>
      </Typewriter.Container>
      <button onClick={() => setUpdatedText((prev) => !prev)}>
        Update Text
      </button>
    </Typewriter.Container>
  );
}
```

### Feedback

If you have any feedback or suggestions for improvement, please feel free to open an [issue](https://github.com/MTG2000/react-typewriter-effect/issues) or submit a [pull request](https://github.com/MTG2000/react-typewriter-effect/pulls) on GitHub. We appreciate your contributions!
