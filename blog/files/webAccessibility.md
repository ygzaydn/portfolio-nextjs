# Web Accessibility

- [Web Accessibility](#web-accessibility)
  - [Accessilibity Standarts](#accessilibity-standarts)
    - [Web Content Accessibility Guidelines 2](#web-content-accessibility-guidelines-2)
    - [WebAIM](#webaim)
    - [ARIA](#aria)
  - [Different Ways to Use Web](#different-ways-to-use-web)
    - [Screen Reader](#screen-reader)
  - [Common Practices for Web Accessibility](#common-practices-for-web-accessibility)
    - [Managing Images](#managing-images)
    - [Captions for Audio](#captions-for-audio)
    - [Label Management](#label-management)
    - [Visual Only Labels](#visual-only-labels)
    - [HTML Labels](#html-labels)
      - [Implicit HTML Labels](#implicit-html-labels)
    - [A Trick to Speak Screenreaders](#a-trick-to-speak-screenreaders)
    - [Making an Unlabeled Element Accessible](#making-an-unlabeled-element-accessible)
    - [Notifying Screen Reader Users](#notifying-screen-reader-users)
    - [Focus Management](#focus-management)
    - [Skip Links](#skip-links)
    - [Tab Navigation](#tab-navigation)
    - [Tracking Active Element](#tracking-active-element)
    - [Tab Trapping](#tab-trapping)

Web accessibility is a aspect of web development mainly focuses on easing the usage of web applications by disabled people. Main motivation is to deliver web services to everyone without any difference. 

> It's important to note that [15% of people](https://www.worldbank.org/en/topic/disability#:~:text=One%20billion%20people%2C%20or%2015,outcomes%20than%20persons%20without%20disabilities.) have some kind of disabilities, which might prevent using web as we do.

In this blog post, I'll try to explain web accessibility and some of its applications in a wider way. I'll start with standarts, ways to use web and as a last title, minimal applications that can help us.


## Accessilibity Standarts

Like at every aspect on web, accessibility concept has some standarts which is developed by a community. There are three different standart that we can discuss here:

### Web Content Accessibility Guidelines 2

[Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG) 2 is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally.

WCAG2, defines three different levels in terms of accessibility, which defined as:

- Level A (lowest)
- Level AA (mid-range)
- Level AAA (highest)

Level A sets a minimum level of accesibility and does not achieve broad accesibility for many situations. For this reaseon, UC recommends AA conformance for all Web-based information.

### WebAIM

[WebAIM](https://webaim.org/) (Web Accessibility in Mind) is an another community that mainly focuses the application of accessibility.

WebAIM specifies that accessible websites should be:

- Perceivable(algılanabilir)
- Operable
- Understandable
- Robust

> *Note:* WebAIM has a handy [checklist](https://webaim.org/standards/wcag/checklist) for WCAG2, which actually helps developers during development process. I recommend developers to take this checklist as a guideline.

### ARIA

[WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) (Web Accessibility Initiative - Accessible Rich Internet Applications) is a specification written by the W3C, defining a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking.

We can say that ARIA is an add-on on HTML elements. It mainly focuses on accessibility.

## Different Ways to Use Web

As we mentioned, people have disabilities may not be able to use computers as we do. For this problem, some devices have been crafted. As a summary, ways to use web:

- Keyboard only users (power-web users)
- Head wand
- Mouth stick
- Single switch
- Screen reader

I'll go through screen reader, which is the most common one.

### Screen Reader

A screen reader is a software application that enables people with severe visual impairments to use a computer. Screen readers work closely with the computer’s Operating System (OS) to provide information about icons, menus, dialogue boxes, files and folders. The device provides access to the entire OS that it works with, including many common applications.

Screen readers uses TTL (text-to-speech) technologies. They convert digital text into synthesized speech.

Lists of popular screen readers are below:

1. Linux screen readers -> Gnopernicus, Speakup

2. MAC OS screen readers -> Voice Over.

3. Windows screen readers -> Jaws for Windows (JFW), Hal, Window Eyes.

## Common Practices for Web Accessibility

In this part of the post, I'll try to explain some basic applications of web accessbility.

> *Note:* Always use semantic HTML elements instead of div if possible. Also you have to use headers in an ordered way to help screen readers, you can later style them as you wish.

### Managing Images

Images are important content of our web applications. For non-visual devices, there must be some signs that the existence of image. Text readers reads the alt (alternative information) attribute of image elements. It's vital to give descriptive information about the picture here. If screen reader can't find alt text, it'll read alot the file's name. If the image name is hashed value (which is generally the case), end user would face a problem. 

When uploading images as developers, it is recommended to put a descriptive names to images.

If you put empty alt text (alt="") screenreader will basically skip it. Images that dont convey content should have empty alt text. Screen readers ignore CSS background styles.

Search engines also make use of alternative text. For years SEO shops have suggested stuffing the keywords yo want to rank for into alt text wherever possible. This provides a very bad accessbility experience.

### Captions for Audio

If you have a video, make sure you have audio captions for it. (This is the main concern actually, you always have to consider all types of sources when delivering them. Always keep in mind that some people will not be able to reach as we do.)

### Label Management

Labels are another important semantic HTML element for screen readers. It basically guides the user about the content. Usage of labels are vital. There are different approach about the topic.

### Visual Only Labels

A common pattern is using div's or paragraph tags to label form fields.

```HTML
<form>
    <p>First Name</p>
    <input type="text" />
    <p>Last Name</p>
    <input type="text" />
    <p>Password</p>
    <input type="password" />
    <input type="submit" value="Submit" />
</form>
```

This implementation is not applicable for screen readers. Screen reader users might confuse during fulfilling the form, since labels are not used as an HTML item here.

### HTML Labels

A better option is to use the HTML label tag which will allow screen readers to recite the label when the field is focused.

```HTML
<form>
    <label for="first">First Name</label>
    <input id="first" type="text" />
    <label for="last">Last Name</label>
    <input id="last" type="text" />
    <label for="password">Password</label>
    <input id="password" type="password" />
    <input type="submit" value="Submit" />
</form>
```

This is better approach here. We've matched labels with input elements here. Screen readers will understand the concept better here.

#### Implicit HTML Labels

Another cool trick you can do is wrap your inputs with the label tag. This is called implicit labelling.

```HTML
<form>
  <label>
    First Name
    <input id="first" type="text" />
  </label>
  <label>
    Last Name
    <input id="last" type="text" />
  </label>
  <label>
    Password
    <input id="password" type="password" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

This is another approach, which works similar as above.

Limitations with the <label> tag: The label tag can only works with "labelable" elements. Those include:

<button>
<input>
<keygen>
<meter>
<output>
<progress>
<select>
<textarea>

If you ever need to label an element not on that list, use aria-label instead.

```HTML 
<div aria-label="Interactive div">Hello</div> 
```

> *Note:* Adding tabindex means that the HTML element is focusable with the keyboard. You can tab to it essentially. ```tabindex="0"```

### A Trick to Speak Screenreaders

In some cases, you just want to interact with screenreaders, in this case we need to create an HTML element to contact screenreader and hide it with CSS to prevent visual representation.

```CSS
.visuallyhidden {
  position: absolute;
  left: 0;
  top: -500px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

### Making an Unlabeled Element Accessible

As I've mentioned above, not all HTML elements are semantic and labelable. So that accessing those elements might be a problem for disabled people. To prevent this, there are some additions that we can make.

```HTML
<button onclick="alert('Hello')">Click me!</button>
```

Assume that we have to use `div` instead of button. To do this, we have to add multiple attributes on div HTML element. A good solution would be as follows:

```HTML
<div aria-label="Alert the word hello" 
  tabindex="0" role="button" onclick="alert('hello')" 
  onkeyup="alert('hello')">
  Click me!
</div>
```

Let me explain the HTML element above: 


- aria-label: This attribute is used to make a explanation for screen-reader users. It'll basically inform the user about the content that he/she faces.

- tab-index: This attribute is used to make div element tabable.

- onkeyup: This attrubte is added to make this div element interactive with keyboard. When element is focused with tab, user can call function by clicking 'space' or 'enter'.

### Notifying Screen Reader Users

Applications can become very dynamic. For cases where important information could be coming in at any time, the ARIA spec provides the ability to mark an element as containing live data so that screen readers can read out updates as they come.

```HTML
<div aria-live="assertive">Waiting for a ride</div>
```

Then, all we have to do is update the content of that div and any assistive technology will let the user know.

The value that you pass in to aria-live is a politeness setting. You can pass in:

- assertive - will interrupt whatever it's doing to announce.
- polite - will announce the live region update when it next idles.
- off - will not read the update.

Scope aria-live as small as possible. Otherwise it'll announce every update at the element.

### Focus Management

It's generally for only-keyboard users. Focus rings provide a necessary clue as to the currently active item. On focus, we need indicator which should not too big, but also big enough to notice the place where we are.

### Skip Links

When your navigation is long (i.e. your header has lots of items) keyboard only users will suffer until they pass all of those items. To solve this, you put an unvisible button to help users skip navigation parts, into the content.

How to make a skip link:

1.  Create an anchor with the body "Skip to content"
2.  Pretend it to the body of your website
3.  Make it visually hidden
4.  Give it a focus state which makes it visible

### Tab Navigation

For surfing on the page without a mouse, users generally use `tab` button. Pressing tab navigates to the next tabable item. Pressing `shift + tab` navigates the previous tabable item.

> Some tabable items: <a>, <button>, <input>, <select>, <textarea>, <iframe>

For untabable HTML elements, its always possible to add `tabindex` attribute to make them tabable.

```HTML
<div tabindex="0">I'm focusable item now</div>
```

> Tabindex values
> 1. a negative value means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
> 2. 0 means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
>3. a positive value means should be focusable and reachable via sequential keyboard navigation; its relative order is defined by the value of the attribute: the sequential follow the increasing number of the tabindex. If several elements share the same tabindex, their relative order follows their relative position in the document.

### Tracking Active Element

Sometimes we need to track the position of user on webpage. `document.activeElement` API returns the focused element. You can track the position of user. Assume a scenario that focused element opens a pop-up window. A good practice would to cache the element before clicking it. After pop-up window closes, you can focus the cached element so that you won't lose the position.

### Tab Trapping

It's very common that user lost his/her way during tabbing elements. Even in some cases, after tabbing last item, browser focuses the URL itself, instead of webpage. This case happens a lot on pop-up windows. When a pop-up screen pops up, developer must always know that there is another screen on background, which is blacked only. While surfing on pop-up, the next tab after URL highlight navigates the page on background, so user is completely lost on navigation before closing the pop-up. We have to prevent this effect before occurs. Solution of this problem is to add an eventListener that listens tab clicks, whenever you're at last element on modal, on next click you'd focus on first element, instead of URL.