import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme";
import DisplayMeme from "./components/DisplayMeme";

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);

  
  function returnToStart() {
    setMeme(null);
    setTemplate(null);
  }

  return (
    <div>
      {meme && (
        <>
        <DisplayMeme meme={meme} />
        <div className="button">
          <button className="button1" onClick={returnToStart}>Pick another template</button>
        </div>
        </>
      )}
      {!meme && (
      <div style={{ textAlign: "center" }}>
        {template && (
          <form
            onSubmit={async e => {
              e.preventDefault();
              
              const params = {
                template_id: template.id,
                text0: topText,
                text1: bottomText,
                username: "povgus",
                password: "koksskirtumas123"
              };
              const response = await fetch(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`
              );
              const json = await response.json();
              setMeme(json.data.url);
            }}
          >
            <Meme template={template} />
            <input
              placeholder="top text"
              value={topText}
              onChange={e => setTopText(e.target.value)}
            />
            <input
              placeholder="bottom text"
              value={bottomText}
              onChange={e => setBottomText(e.target.value)}
            />
            <div className="button">
              <button className="button2" type="submit">create meme</button>
            </div>
            <div className="button">
                <button className="button1" onClick={returnToStart}>Pick another template</button>
            </div>
          </form>
        )}
        {!template && (
          <>
            <h1>Pick a meme!</h1>
            {templates.map(template => {
              return (
                <Meme
                  template={template}
                  onClick={() => {
                    setTemplate(template);
                  }}
                />
              );
            })}
          </>
        )}
      </div>
      )}
    </div>
    
  );
}

export default App;