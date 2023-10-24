//JSX: Text Container
export function TextContainer({ text }: { text: string }) {
  // get URL in text
  const urlify = (text: string) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  };
  //-----------------------------
  const __html = urlify(text);
  return <div className="TextContainer" dangerouslySetInnerHTML={{__html}}></div>;
}
//JSX_END: Text Container
