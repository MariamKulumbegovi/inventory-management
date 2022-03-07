import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { ADD_PATH } from "../../constants/paths";
import { getItem } from "../../heplers/LocalStorage";
import { useInventoryContext } from "../../Provider/InventoryProvider";

export const HomePage = () => {
  const [items, setItems] = useState(getItem("Inventory"));

  const { deleteItem } = useInventoryContext();
  console.log("render");
  useEffect(() => {}, [items, deleteItem]);

  return (
    <div className="container-fluid HomePage-Wrapper">
      <Link to={ADD_PATH}>
        <button type="button" className="btn btn-primary btn">
          ნივთის დამატება
        </button>
      </Link>
      <table className="fixed table  table-light mt-3  table-responsive container table-hover caption">
        <thead>
          <tr className="min">
            <th scope="col">ნივთის სახელი</th>
            <th scope="col">ნივთის ადგილმდებარეობა</th>
            <th scope="col">ფასი</th>
            <th scope="col">ოპერაციები</th>
          </tr>
        </thead>
        <tbody>
          {items ? (
            items.map((item) => {
              return item ? (
                <tr className="min" key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.price} ლ</td>
                  <td>
                    <button
                      onClick={() =>
                        deleteItem(item.id) & setItems(getItem("Inventory"))
                      }
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      წაშლა
                    </button>
                  </td>
                </tr>
              ) : (
                <></>
              );
            })
          ) : (
            <tr className="emptyList">
              <td></td>
              <td className="pt-5">სია ცარიელია </td>
              <td> </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to={ADD_PATH}>
        <button type="button" className="btn btn-primary btn">
          ნივთის დამატება
        </button>
      </Link>
    </div>
  );
};
