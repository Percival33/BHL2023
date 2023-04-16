import React, { useState, useEffect } from "react";

const HeatMap = () => {
  // dummy data
  const data = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  const [map, setMap] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      const data = await (
        await fetch(`http://localhost:8000/dashboard/heatmap`)
      ).json();
      console.log(data);
      setMap(data);
    };
    fetchMap();
  }, []);

  map.forEach((point) => {
    data[point.regal - 1][point.column - 1] += point.qty;
  });

  // generate the heatmap cells
  const cells = data.map((row, rowIndex) =>
    row.map((value, colIndex) => {
      // calculate the hue component of the color based on the value
      const hue = Math.round((value / 100) * 10);
      // calculate the lightness component of the color based on the value
      const lightness = 75 - Math.round((value / 100) * 50);
      const color = `hsl(${hue}, 100%, ${lightness}%)`;
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className="py-3 px-6 text-center"
          style={{ backgroundColor: color }}
        >
          {value}
        </div>
      );
    })
  );

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="grid grid-cols-2 grid-rows-4 gap-2">{cells}</div>
    </div>
  );
};

export default HeatMap;
