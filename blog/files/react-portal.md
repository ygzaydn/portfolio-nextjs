# React Portals

[React Portal](https://blog.bitsrc.io/understanding-react-portals-ab79827732c7) is a first-class way to render child components into a DOM node outside of the parent DOM hierarchy defined by the component tree hierarchy. 

Main use cases of react portals are:

1.	Modals
2.	Tooltips
3.	Loaders

In this post, I'll create a modal by using react portal to show the usage.

## How to Create React Portal

A react portal can be crated using the `createPortal` function imported from react-dom. It takes two arguments:

1.	content: React element
2.	containerElement: a DOM element to which we can append the content.

```jsx
ReactDOM.createPortal(content, containerElement)
```

## Creating Modal Component

As I've mentioned above, we aim to create a DOM element outside of our parent element. So it'd be a wise choice to create a completely different element when dealing with portals. Following component can be used as a Modal window.

```jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, id = "modal" }) => {
    const createDiv = (id) => {
        if (document.getElementById(id)) {
            return document.getElementById(id);
        }
        const element = document.createElement("div");
        element.setAttribute("id", id);
        element.setAttribute("class", "modal");

        return element;
    };
    const element = createDiv(id);

    useEffect(() => {
        document.body.appendChild(element);
        return () => document.body.removeChild(element);
    }, [element]);

    return createPortal(
        <div
            className="modal-inner"
        >
            {children}
        </div>,
        element
    );
};

export default Modal;

```

Let's go into code and see what happens. As first step, we define a function to control if we have DOM element by given id, if not we create one.

On useEffect hook, we append our DOM element to body, and when we unmount the Modal, we clean up the element that we attached to.

To use Modal on any component, we can conditionally render the Modal component as follows:

```jsx
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Modal from "./Modal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={() => setModalOpen(true)}>
                    Click here to open modal
                </button>
            </header>
            {modalOpen && (
                <Modal>
                    <button onClick={() => setModalOpen(false)}>
                        Click here to close modal
                    </button>
                </Modal>
            )}
        </div>
    );
}

export default App;

```