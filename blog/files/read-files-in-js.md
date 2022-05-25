# Read files in JavaScript

Nowadays, browsers have lots of interactions with end users. One of the most used scenario to upload file by dragging file into browser.

On this post, I'll try to explain the vital points to do this scenario.

## Taking data 

### By using HTML input element

The easiest and most basic way to select file is to use <input type="file"/> element, which is supported by almost all browers. When this button is clicked, user is prompt to select a file to read. There are some options for this HTML element.

-	When user want to add multiple files, `multiple` attribute is necessary. `<input multiple type="file />`
-	When user wants specific type of files. `accept` attribute is necessary. `<input accept=".jpg, .jpeg, .png" type="file" />`

Whenever the user finishes selecting a file or files, the element's `change` event is fired. Developers can access the list of files from `event.target.files`, which is a *FileList* object. Each item in the *FileList* is a *File* object.

> [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList): An object of this type is returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element.

> [File](https://developer.mozilla.org/en-US/docs/Web/API/File): The File interface provides information about files and allows JavaScript in a web page to access their content. A File object is a specific kind of Blob, and can be used in any context that a Blob can. In particular, FileReader, URL.createObjectURL(), createImageBitmap(), and XMLHttpRequest.send() accept both Blobs and Files.

```javascript

<input type="file" id="file-selector" multiple>
<script>
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
</script>

```

### Using a drag and drop zone

In some browsers, the <input type="file" /> element is also a drop target, allowins users to drag-and-drop files into your app. But the size of input element is small, so it is better approach  ao provide a large, custom drag-and-drop surface.


#### Defining drop zone

To enable an element to be a drag-and-drop zone, we need to add listen 2 events `dragover` and `drop`. The `dragover` event updates the browser UI to visually indicate that the drag-and-drop action is creating a copy of the file. The `drop` event is fired after the user has dropped the files onto the surface. As we've done to the input element, we can access the list of files from `event.dataTranser.files` which is a *FileList* object again.

```js
const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy'; // To add style during drag-and-drop
});

dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  console.log(fileList);
});
```

> event.stopPropagation() and event.preventDefault() stop the browser's default behavior from happening, and allow your code to run instead. Without them, the browser would otherwise navigate away from your page and open the files the user dropped into the browser window.

## Reading File

After taking file on the browser, we need to parse the information we get.

### Read file metadata

The `File` object contains a number of metadata properties about the file. Most browsers provide the file name, the size of the file, and the MIME type, though depending on the platform, different browsers may provide different, or additional information.

```js
function getMetadataForFileList(fileList) {
  for (const file of fileList) {
    // Not supported in Safari for iOS.
    const name = file.name ? file.name : 'NOT SUPPORTED';
    // Not supported in Firefox for Android or Opera for Android.
    const type = file.type ? file.type : 'NOT SUPPORTED';
    // Unknown cross-browser support.
    const size = file.size ? file.size : 'NOT SUPPORTED';
    console.log({file, name, type, size});
  }
}
```

### Read file content

To read a file, we need to use *FileReader*.

> [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader): The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.

```js
function readImage(file) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}
```

## Monitoring File

When reading large files, it'd be a good idea to show progress to user. For that we can use `progress` event provided by *FileReader*. The progress event provides two properties **loaded**, and **total**.

### Progress Event

The ProgressEvent interface represents events measuring progress of an underlying process, like an HTTP request (for an XMLHttpRequest, or the loading of the underlying resource of an <img>, <audio>, <video>, <style> or <link>).

-	Properties
	-	ProgressEvent.lengthComputable Read only
A boolean flag indicating if the total work to be done, and the amount of work already done, by the underlying process is calculable. In other words, it tells if the progress is measurable or not.

	-	ProgressEvent.loaded Read only
A 64-bit unsigned integer value indicating the amount of work already performed by the underlying process. The ratio of work done can be calculated by dividing total by the value of this property. When downloading a resource using HTTP, this only counts the body of the HTTP message, and doesnt include headers and other overhead.

	-	ProgressEvent.total Read only
A 64-bit unsigned integer representing the total amount of work that the underlying process is in the progress of performing. When downloading a resource using HTTP, this is the Content-Length (the size of the body of the message), and doesnt include the headers and other overhead.

```js

function readFile(file) {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const result = event.target.result;
    // Do something with result
  });

  reader.addEventListener('progress', (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      console.log(`Progress: ${Math.round(percent)}`);
    }
  });
  reader.readAsDataURL(file);
}
``` 
