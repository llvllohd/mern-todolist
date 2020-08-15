import React from "react";
import "./Listitems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";

function ListItems(props) {
  const todos = props.todos;
  const listItems = todos.map((item) => {
    return (
      <div className="list" key={item._id}>
        <p onClick={(e) => props.showEditForm(item)}>{item.text}</p>

        <span>
          <FontAwesomeIcon
            className="faicons"
            icon="trash"
            onClick={() => props.deleteHandler(item._id)}
          />
        </span>
      </div>
    );
  });
  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListItems;
