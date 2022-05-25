# Dropping Image Files on React

In modern web, we generally ask users to upload their images to our App. The fanciest way to do this is to implement and drag element, which allows user to drag their files. This operation enhances the experience of end-users.

> General approach of dragging files on javascript is explained [here](/blog/9)

In this post, I'll try to solve this puzzle by using React.

> PS: You can check my solution [here](https://codesandbox.io/s/happy-diffie-s7eyr9). Feel free to ask anything.


## Handling Drag Events

In order to create drag element, first thing we need to do is to create event listeners to catch drag element. Event listeners that I've been using are *dragleave*, *dragover* and *drop*.

> dragleave catches when we drag the file out of the container that we defined.
> dragover catches the moment when we're dragging file over the container that we defined.
> drop catches the moment when we drop the file on the container.

To add listeners to our React component, using *useEffect()* hook is the best way. So let's add those listeners.

```javascript
  useEffect(() => {
    addEventListener("dragleave", handleDragOut);
    addEventListener("dragover", handleDrag);
    addEventListener("drop", handleDrop);
    return () => {
      removeEventListener("dragleave", handleDragOut);
      removeEventListener("dragover", handleDrag);
      removeEventListener("drop", handleDrop);
    };
  }, []);
```

Please notice that I've called callback functions on each event listener. So next step is to define those callback functions.

```javascript
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
```

I've added `preventDefault` and `stopPropagation` events to prevent unwanted behaviour on dragging event. If we miss this part, the image will open as a new window and we'll be out of out app completely, so adding those methods is critical.

Next step is to define a state to store data, I'll call state as *file*.

```javascript
  const [file, setFile] = useState({ status: null, content: null });
```

Now we can add state changes on our listeners. 

```javascript
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile((prev) => ({ ...prev, status: "dragging" }));
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile((prev) => ({ ...prev, status: "drop" }));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = e.dataTransfer.files[0];

    setFile((prev) => ({
      ...prev,
      content: item,
      status: true
    }));
  };
```

Let me add another method to remove element, which we may use.

```javascript
  const removeImage = () => {
    setFile({ status: null, content: null });
  };
```

## Connecting Event Listeners To React Elements

Our event listeners are ready. Now it's time to connect them to our react element. I generally use `useRef` hook to make this connection. So this is a good practice to use `useRef` here. I will define 2 ref (one for upload container, and one for image element) as follows.

```javascript
   const uploadDiv = useRef(null);
   const imageRef = useRef(null);
```

Now we should be able to connect our listeners to React element. Let me create JSX skeleton for our app first. One possible implementation of JSX can be:

```javascript
   ...
   const { status } = file;

  return (
    <div className="App">
      <div className="uploadBox" ref={uploadDiv}>
        {status === null && <h2>Drag a file to load </h2>}
        {status === "drop" && <h2>Drop here!</h2>}
        {status === "dragging" && <h2>Find me!</h2>}
        {status === true && (
          <div>
            <span className="closeIcon" onClick={() => removeImage()}>
              X
            </span>
            <img ref={imageRef} alt="uploadedImage" className="image" />
          </div>
        )}
      </div>
    </div>
  );
```

We're ready to connect our ref's to JSX elements. Vital point here to determine the places that we need those refs. When we think about it, it'd be a wise choice to use uploadDiv ref on initial render, and imageRef on the image container element. We already have a useEffect on initial render, so we only need add another useEffect to listen changes on data.contant item.

```javascript
  useEffect(() => {
    if (imageRef.current) {
      if (file?.content) {
        imageRef.current.src = URL.createObjectURL(file.content);
      } else {
        imageRef.current.src = null;
      }
    }
  }, [file, file.content]);
```

> URL.createObjectURL() method helps us to preview the image we use.

## Result

Overall solution should look like:

```javascript
import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [file, setFile] = useState({ status: null, content: null });
  const uploadDiv = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const div = uploadDiv.current;

    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return () => {
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile((prev) => ({ ...prev, status: "dragging" }));
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile((prev) => ({ ...prev, status: "drop" }));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = e.dataTransfer.files[0];

    setFile((prev) => ({
      ...prev,
      content: item,
      status: true
    }));
  };

  const removeImage = () => {
    setFile({ status: null, content: null });
  };

  useEffect(() => {
    if (imageRef.current) {
      if (file?.content) {
        imageRef.current.src = URL.createObjectURL(file.content);
      } else {
        imageRef.current.src = null;
      }
    }
  }, [file, file.content]);

  const { status } = file;

  return (
    <div className="App">
      <div className="uploadBox" ref={uploadDiv}>
        {status === null && <h2>Drag a file to load </h2>}
        {status === "drop" && <h2>Drop here!</h2>}
        {status === "dragging" && <h2>Find me!</h2>}
        {status === true && (
          <div>
            <span className="closeIcon" onClick={() => removeImage()}>
              X
            </span>
            <img ref={imageRef} alt="uploadedImage" className="image" />
          </div>
        )}
      </div>
    </div>
  );
}
```

So that we've managed to create the upload element to use. I hope this post explains the topic as you need.

> You can check my solution [here](https://codesandbox.io/s/happy-diffie-s7eyr9). Feel free to ask anything.



