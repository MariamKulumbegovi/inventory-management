import React, { useEffect, useState } from "react";
import { getItem } from "../../heplers/LocalStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./AddNewItem.css";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constants/paths";

export const AddNewItem = () => {
  const [selectValue, setSelectvalue] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useLocalStorage("Inventory", []);

  const onSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const inventoryData = {};
    const unique_id = uuid();
    for (let [key, value] of fd.entries()) {
      inventoryData[key] = value;
      inventoryData.id = unique_id;
    }

    const items = getItem("Inventory");

    items
      ? setItems([...items, inventoryData])
      : setItems([items, inventoryData]);
  };
  useEffect(() => {}, [items]);

  const mes = () => {
    setTimeout(function () {
      alert("successfully added");
    }, 0.1);
  };

  return (
    <div className="container-fluid  d-flex justify-content-center Add-Wrapper">
      <form onSubmit={onSubmit} className="container form bg-light">
        <div className="row mb-3">
          <select
            title="აირჩიეთ ადგილმდებარეობა"
            className="form-select"
            aria-label="location"
            required
            name="location"
            value={selectValue}
            onChange={({ target }) => setSelectvalue(target.value)}
          >
            <option value="" disabled selected>
              ადგილმდებარეობა
            </option>
            <option value="მთავარი ოფისი">მთავარი ოფისი</option>
            <option value="კავეა გალერია">კავეა გალერია</option>
            <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
            <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
            <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
          </select>
        </div>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            სახელი
          </label>
          <div className="col-sm-10">
            <input
              title="შეიყვანეთ სახელი"
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              type="text"
              className="form-control"
              id="name"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="price" className="col-sm-2 col-form-label">
            ფასი
          </label>
          <div className="col-sm-10">
            <input
              title="შეიყვანეთ ფასი"
              type="number"
              className="form-control"
              id="price"
              required
              name="price"
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            />
          </div>
        </div>
        <button onClick={mes} type="submit" className="btn btn-primary">
          დამატება
        </button>
        <Link className="ms-3" to={HOME_PATH}>
          <button type="button" className="btn btn-secondary ">
            სია
          </button>
        </Link>
      </form>
    </div>
  );
};
