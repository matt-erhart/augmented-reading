import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const CircleDiv = styled.div`
  position: fixed;
  background-color: green;
  left: 0vw;
  bottom: 0vh;
  border-radius: 5px;
  /* width: 30px; */
  /* height: 30px; */
  max-height: 60px;
  margin: 3px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  z-index: 111111111111;
  padding: 5px;
`;

// Figuring out what a really want as I search
// Multiple versions of what I really
// early diagnosis seems important 
// multiple questions

const exampleQuestion = 'What are some ways to increase safe behavior and social distancing?'
const offScreenCoords = { left: -1000, top: -1000 };
const App = () => {
  const [leftTop, setLeftTop] = React.useState(offScreenCoords);

  function DocDragHandler(e: DragEvent) {
    setLeftTop({ left: e.clientX, top: e.clientY - 50 });
    const linkText = e?.srcElement?.text;
    const linkHref = e?.srcElement?.href;
    console.log("linkHref: ", linkText, linkHref);

    if (!linkText || !linkHref) {
      var textSelection = window.getSelection();
      console.log(textSelection?.toString());
    }
  }

  React.useEffect(() => {
    document.addEventListener("dragstart", DocDragHandler);
    return () => document.removeEventListener("dragstart", DocDragHandler);
  }, []);

  return [
    <CircleDiv
      key="dragto"
      style={{ ...leftTop }}
      onDragOver={e => {
        e.persist();
        e.preventDefault();
      }}
      onDrop={e => setLeftTop(offScreenCoords)}
    >
      {exampleQuestion}
    </CircleDiv>,
    // <CircleDiv key="circle menu">{exampleQuestion}</CircleDiv>
  ];
};

export function MountReact() {
  const app = document.createElement("div");
  app.id = "my-extension-root";
  app.style.position = "fixed";
  app.style.top = "0px";
  app.style.left = "0px";
  document.body.appendChild(app);
  console.log("MountReact1");
  render(<App />, app);
}
