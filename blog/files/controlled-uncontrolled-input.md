# Controlled and Uncontrolled Components on React

Almost at any project, we use <input /> element that HTML serves us. It basically asks user to select or enter some values for a given field. Those <input /> elements are also parts of forms. Like <input /> element, we generally use <form /> element frequently.

While using <input /> elements, I bet most of you have faced the warning similar below:

**Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.**

This issue belongs the concept of controlled & uncontrolled components of React and in this post, I'll try to explain those components.

## Uncontrolled Components

On uncontrolled components, data is handled by the DOM itself. To be more clear, we do not have event handlers for every update at data, instead we try to get data by **using a ref**. Uncontrolled components keep the source of data in the DOM, so it might be easier to integrate React and non-React code. Also they are easier to implement, but we generally prefer to use controlled inputs. On below, we have an uncontrolled component:

```javascript
import { useRef } from "react";

const UncontrolledComponent = () => {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>Uncontrolled Component</h4>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledComponent;
```

As we can see above, we get the input nothing but by using ref. In this case, we do not have full control on input changes, but on submit, we will still be able to control the input.

> It's possible to say that uncontrolled inputs are like traditional HTML form inputs.

It's important to notice that we pull the value from the field when we need it. That's why we generally do not have unnecessary re-renders.

In the react rendering lifecycle, the `value` attribute on input elements will override the value in the DOM. 

> For uncontrolled components, we often want React to specify the initial value, but leave subsequent updates uncontrolled.

Likewise, <input type="checkbox"> and <input type="radio"> support defaultChecked, and <select> and <textarea> supports defaultValue. 

It is important to note that **<input type="file" />** element is always behave as an uncontrolled component on React. (Because its value can only be set by a user, not programmatically.

## Controlled Components

What about controlled components? It's obvious that its opposite of uncontrolled one. On controlled components, we have event handler for our data, we listen for every change and our application and DOM work in sync. 

> Controlled components is more useful when controlling data is important aspect of the context.

When we put `value` prob on JSX element, we can say that it is a controlled component.

```javascript
<input value={someValue} onChange={handleChange} />
```

Important point here is to handling the `value` and `onChange` props. It is common pattern to assign a state value for `value` and use its setter function on `onChange`.

Let me give an example below:

```javascript
import { useState } from "react";

const ControlledComponent = () => {
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e) => setInputVal(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputVal);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>Controlled Component</h4>
      <input type="text" value={inputVal} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledComponent;
```

> Note that we do NOT have to use `useState` hook here. It can be any store, or even external stroes like Redux.

Everytime input changes, it stores on our state, and component gets re-rendered. This flow kind of 'pushes' the value changes to the form component, so the Form component always has the current value of the input, without needing to ask for it explicitly.

This means your data (state) and UI (inputs) are always in sync. The state gives the value to the input, and the input asks the Form to change the current value.

This also means that the form component can respond to input changes immediately; for example, by:

-	in-place feedback, like validations
-	disabling the button unless all fields have valid data
-	enforcing a specific input format, like credit card numbers

But if we don't need any of that and consider uncontrolled to be simpler, we can easily use them.

> It's important to know that "A form element becomes "controlled" if you set its value via a prop." It does not matter if we have text, checkbox, radio or select element. If it isn't "file" element, we're fine.

## Conclusion

Both the controlled and uncontrolled form fields have their merit. We have to ecaluate specific situation and pick the approach — what works for us is good enough.

![table](/table.png)

