import { createContext, useContext, useState, useEffect } from "react";
import data from "../data"; // Import dessert data

// Create Context
const DataContext = createContext();

// Context Provider Component    
export const DataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [dataState, setDataState] = useState(data); // Stores the modifiable dessert list
  const [modalState, setModalState] = useState(false)

  // Toggle selection for an item
  const toggleSelection = (id) => {
    setDataState((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, quantity: 1 } : item
      )
    );
  };

  const incrementQuantity = (id) => {
    setDataState((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setDataState((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : { ...item, selected: false, quantity: 0 } // Deselect when quantity reaches 0
          : item
      )
    );
  };

  const clearSelection = (id) => {
    setDataState((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, quantity: 0 } : item
      )
    );
  };

  const displayModal = () => {
      setModalState(!modalState)
  }

  const newOrder = () =>{
    setModalState(!modalState)
    setDataState(data)
  }

  // ✅ Use useEffect to update cartItems when dataState changes
  // ✅ UseEffect to update cartItems and total quantity
  useEffect(() => {
    const updatedCart = dataState.filter(item => item.selected);
    setCartItems(updatedCart);

    // ✅ Calculate total quantity using reduce
    const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalOrderPrice = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalItems(totalQuantity);
    setTotalPrice(totalOrderPrice);
  }, [dataState]);


  return (
    <DataContext.Provider value={{ data: dataState, cartItems, toggleSelection, incrementQuantity, decrementQuantity, totalItems, totalPrice, clearSelection, displayModal, modalState,newOrder }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useDataContext = () => useContext(DataContext);
