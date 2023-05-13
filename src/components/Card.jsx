import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";


const Card = (props) => {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({ type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size });
    // console.log(data);
  }

  let finalPrice = qty * parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value);
  },[]);
 
  return (
      <div>

        <div className="card mt-3 bg-transparent mb-5" style={{ "width": "17rem", "maxHeight":"360px", "border":"2px solid black"}}>
          <img src={props.foodItem.img} className="card-img-top" style={{height:"150px", objectFit:"fill"}} alt="..." />
          <div className="card-body p-0" style={{borderTop:"2px solid black"}}>
            <h5 className="card-title w-100 p-2 text-center" style={{backgroundColor:"black", color:"white",borderBottom:"2px solid black"}}>{props.foodItem.name}</h5>
            <div className="container w-100 text-center">
              <select className="m-2 p-1 bg-transparent rounded-0 w-25" style={{color:"black"}} onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e,i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  );
                })} 
              </select>

              <select className="m-2 p-1 bg-transparent rounded-0" style={{color:"black"}} ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {
                  priceOptions.map((data)=>{
                    return (
                    <option key={data} value={data}>{data}</option>
                    )
                  })
                }
              </select>
              <br />
              <div className="fs-5 mt-2">
              Total Price: ₹{finalPrice}/-
                </div>
            </div>
            <hr></hr>
            <button className={`btn rounded-0 cartButton`} style={{backgroundColor:"black", marginLeft:"74px", marginBottom:"19px", marginTop:"-22px", color:"white"}} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
  );
};


export default Card;
