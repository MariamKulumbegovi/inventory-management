import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { ADD_PATH } from "../../constants/paths";
import { getItem } from "../../heplers/LocalStorage";
import { useInventoryContext } from "../../Provider/InventoryProvider";

export const HomePage = () => {
  const [items, setItems] = useState(getItem("Inventory"));
  const [filterParam, setFilterParam] = useState(["ყველა"]);
  const [fil, setFil] = useState(getItem("Inventory"));

  const { deleteItem } = useInventoryContext();

  useEffect(() => {
    let a = [];
    if (items) {
      items.filter((item) =>
        item
          ? item.location === filterParam
            ? a.push(item) & setFil(a)
            : filterParam === "ყველა"
            ? setFil(items)
            : console.info("filter parameter is not all")
          : console.info("no item")
      );
    }
  }, [items, deleteItem, filterParam]);

  return (
    <div className="container-fluid HomePage-Wrapper">
      <div className="select-wrapper d-flex justify-content-between">
        <Link to={ADD_PATH}>
          <button type="button" className="btn btn-primary btn">
            ნივთის დამატება
          </button>
        </Link>
        <select
          title="აირჩიეთ ადგილმდებარეობა"
          className="location-select"
          aria-label="location"
          required
          name="location"
          value={filterParam}
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
        >
          <option defaultValue="ყველა" value="ყველა">
            ყველა
          </option>
          <option value="მთავარი ოფისი">მთავარი ოფისი</option>
          <option value="კავეა გალერია">კავეა გალერია</option>
          <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
          <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
          <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
        </select>
      </div>
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
          {fil ? (
            fil.map((item) => {
              return item ? (
                <tr className="min" key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.price} ლ</td>
                  <td>
                    <button
                      onClick={() =>
                        deleteItem(item.id) & setFil(getItem("Inventory"))
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
