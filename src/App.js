import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";

function App() {
  const [text, setText] = useState(null);

  const textarea = useRef(null);

  useEffect(() => {
    textarea.current.value = `<!-- Headings -->
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<!-- Links -->
[Traversy Media](http://www.traversymedia.com)

[Traversy Media](http://www.traversymedia.com "Traversy Media")


<!-- Inline Code Block -->
\`<p>This is a paragraph</p>\`

<!-- Code Blocks -->
\`\`\`javascript
  function add(num1, num2) {
    return num1 + num2;
  }
\`\`\`

<!-- UL -->
* Item 1
* Item 2
* Item 3
  * Nested Item 1
  * Nested Item 2

<!-- OL -->
1. Item 1
1. Item 2
1. Item 3


<!-- Blockquote -->
> This is a quote

<!-- Images -->
![Markdown Logo](https://markdown-here.com/img/icon256.png)


<!-- Bold -->
**This text** is bold
    `;

    let rawMarkup = marked.parse(textarea.current.value);

    setText({ __html: rawMarkup });
  }, []);

  const handleInput = (e) => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    let rawMarkup = marked.parse(e.target.value);

    setText({ __html: rawMarkup });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 my-3">
          <h5 class="text-success text-center py-4">
            <strong>Editor:</strong>
          </h5>
          <textarea
            ref={textarea}
            className="border border-3 border-success rounded "
            onChange={handleInput}
            name="markdown_input"
            id="editor"
            cols="60"
            rows="50"
          ></textarea>
        </div>
        <div className="col-lg-6 my-3">
          <h5 class="text-success text-center py-4 ">
            <strong>Preview:</strong>
          </h5>
          <div
            className=" border border-3 border-success rounded color-success"
            id="preview"
            dangerouslySetInnerHTML={text}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
