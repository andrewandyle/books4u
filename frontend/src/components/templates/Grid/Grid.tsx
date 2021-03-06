import React from "react";

function Grid({ data, Component }: any) {
  return (
    <div className="my-3 row">
      {data.map((item: any) => (
        <Component item={item} key={item.id}></Component>
      ))}
    </div>
  );
}

export default Grid;
