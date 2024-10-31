import "./Box_Search.css";
function Box_Search({ title, onclick, textColor, backColor }) {
  return (
    <div
      onClick={onclick}
      className="box_search"
      style={{ "--box-color": backColor, "--text-color": textColor }}
    >
      {title}
    </div>
  );
}

export default Box_Search;
