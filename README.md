# React Effect Typewriter

`react-effect-typewriter` is a lightweight and highly customizable React library that allows you to create captivating typewriter effects. The library's primary focus is on simplicity, customizability, SEO-friendliness and accessibility, ensuring that you can deliver engaging text animations while maintaining best coding practices.

The package comprises two main components - Paragraph and Container. The Paragraph component animates your text to appear one character at a time, and the Container component, a wrapper component, can hold multiple Paragraph components or other nested Container components to create more complex animations.

Harness the power of `react-effect-typewriter` to breathe life into your static text content, create more engaging user interfaces, and enhance overall user experience.

### Installation

```bash
npm install react-effect-typewriter
```

### Usage

All you need to start using the library is importing it & using the `Paragraph` element & it'll immediately give you the effect, see the code below:

```javascript
import Typewriter from "react-effect-typewriter";

const App = () => {
  return <Typewriter.Parahraph>Hello Typewriter!</Typewriter.Parahraph>;
};
```

Under the hood, the `Typewriter.Paragraph` is a normal `<p>` element, so you can pass to it any props you can normal pass to a `<p>` element like `className`, `id`, `onClick`, ...etc.

In addition to that, there are a couple of custom props that you can use to customize the effect.
These options are:

- `typingSpeed`?: (Optional) The speed with which the characters are typed. Defined in milliseconds.
- `onStart`?: (Optional) A callback that is triggered when the typing animation starts.
- `onEnd`?: (Optional) A callback that is triggered when the typing animation ends.
- `onCancel`?: (Optional) A callback that is triggered if the typing animation is cancelled.
- `onCharacter`?: (Optional) A callback that is triggered each time a character is typed. The typed character is passed as an argument to this function.

### Nesting Paragraphs

By default, the `Paragraph` element will start its animation as soon as it mounts on the DOM.
However, you might have multiple paragraphs & you only want a paragraph to start appearing once the previous paragraphs have fully appeared, or you want them to only appear once a certain condition is met, for that, there is another element which is the `Typewriter.Container` element.

The `Container` element will make all its `Paragraph` children (doesn't have to be direct) only animate one after the other, based on the order of their appearance in the tree.
It can also have another `Container` component as a children, so it will wait for the child `Container` to finish all its nested children before moving to other elements.

#### Example Usage:

```jsx
import Typewriter from "react-effect-typewriter";

function App() {
  return (
    <Typewriter.Container>
      <Typewriter.Paragraph>This will appear #1</Typewriter.Paragraph>
      <Typewriter.Container>
        <Typewriter.Paragraph>This will appear #2</Typewriter.Paragraph>
        <Typewriter.Paragraph typingSpeed={20}>
          This will appear #3
        </Typewriter.Paragraph>
      </Typewriter.Container>
      <Typewriter.Paragraph typingSpeed={20}>
        This will appear #4
      </Typewriter.Paragraph>
    </Typewriter.Container>
  );
}
```

The Container component can take the following props:

- `typingSpeed`?: (Optional) This speed will be overwriten by the typingSpeed prop in child Paragraph components.
- `delayBetweenElements`?: (Optional) The delay between the start of the animation of each child element. Defined in milliseconds.

### How the effect is created

I've written a vanilla CSS/Javascript article a while ago explaining the core idea behind creating this effect in an accessible way, you can check this article here:
[How to create a typewriter effect that is accessible & SEO friendly](https://mtg-dev.tech/blog/how-to-create-typewriter-effect-that-is-accessible-and-seo-friendly)

### Feedback

If you have any feedback or suggestions for improvement, please feel free to open an [issue](https://github.com/MTG2000/react-typewriter-effect/issues) or submit a [pull request](https://github.com/MTG2000/react-typewriter-effect/pulls) on GitHub. We appreciate your contributions!
