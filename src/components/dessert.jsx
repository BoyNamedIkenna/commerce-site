import { useDataContext } from "../datacontext";
import { useState } from "react";

export default function Dessert() {
  const { data, toggleSelection, setCartItems, incrementQuantity, decrementQuantity } = useDataContext();
  const [hoveredItem, setHoveredItem] = useState(null); // Track which item is hovered

  
  const button = (item) => {
    if (!item.selected) {
      return (
        <button
          className={`button-default transition-all ${
            hoveredItem === item.id && "border-orange"
          }`}
          onClick={() => {
            toggleSelection(item.id);
            setCartItems(item);
          }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20" className="svg-cart">
            <g fill="#C73B0F" clipPath="url(#a)">
              <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
              <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M.333 0h20v20h-20z" />
              </clipPath>
            </defs>
          </svg>
          Add to cart
        </button>
      );
    } else {
      return (
        <button className="button-cart">
          {/* Decrement Button (-) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              decrementQuantity(item.id);
              setCartItems(item);
            }}
          >
            <path d="M5 12h14" />
          </svg>

          <h1>{item.quantity}</h1>

          {/* Increment Button (+) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="icon"
            onClick={(e) => {
              e.stopPropagation();
              incrementQuantity(item.id);
              setCartItems(item);
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      );
    }
  };

  return (
    <div className="dessert-grid">
      {data.map((item) => (
        <div key={item.id} className="dessert-item">
          {/* Image with hover effect */}
          <img
            className={`dessert-img transition-all ${
              hoveredItem === item.id && "border-orange"
            } ${item.selected && "border-orange"}`}
            src={item.imageUrl}
            onClick={() => {
              toggleSelection(item.id);
              setCartItems(item);
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          />

          {button(item)}

          <p className="title text-gray-500">{item.title}</p>
          <p className="description font-semibold">{item.description}</p>
          <p className="price orange font-semibold">${item.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
