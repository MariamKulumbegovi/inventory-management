import React, { useContext } from "react";
import { getItem, removeItem, saveItem } from "../heplers/LocalStorage";

export const InventoryContext = React.createContext(null);

export const InventoryProvider = ({ children }) => {
  const deleteItem = (id) => {
    var items = getItem("Inventory");
    let a = [];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item && id) {
          if (item.id !== id) {
            a.push(item);

            saveItem("Inventory", a);
          } else if (items.length <= 1) {
            removeItem("Inventory");
          }
        }
      }
    }
  };

  return (
    <InventoryContext.Provider value={{ deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const value = useContext(InventoryContext);

  if (!value) {
    throw new Error("Inventory context is not defined");
  }
  return value;
};
