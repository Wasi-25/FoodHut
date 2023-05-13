import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {

  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClassName = isSticky ? "position-fixed" : "navbar";

  return (
    <>
      <div>
        <nav className={`navbar navbar-expand mx-3 my-2 ${navbarClassName}`} style={{ backgroundColor: "whitesmoke", width: "97.5%", position: "sticky", top: 0, zIndex: 999, transition: "top 0s ease 0s"}}>
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic" style={{color:"black"}} to="/">FoodHut</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link linknav" aria-current="page" style={{color:"black", fontSize:"0.9rem"}} to="/">HOME</Link>
                </li>
                {
                  (localStorage.getItem("authToken"))?
                  <li className="nav-item">
                  <Link className="nav-link linknav" aria-current="page" to="/myOrder" style={{color:"black", fontSize:"0.9rem"}}>MY ORDERS</Link>
                </li>
                :""}
              </ul>

              {
                  (!localStorage.getItem("authToken"))?
                <div className="d-flex">
                  <Link className="btn mx-1 linknav" to="/login" style={{color:"white", backgroundColor:"black"}}>Login</Link>
                  <Link className="btn mx-1 linknav" to="/createuser" style={{color:"white", backgroundColor:"black"}}>Sign up</Link>
                </div>
                :
                <div>
                  {data.length > 0 && 
                  <div className="btn mx-3 rounded-0 linknav" style={{color:"white", backgroundColor:"black", fontSize:"0.8rem"}} onClick={()=>{setCartView(true)}}>MY CART {"  "} {<Badge pill bg="danger">{data.length}</Badge>}</div>
                  }

                  {data.length === 0 &&
                    <div className="btn mx-3 rounded-0 linknav" style={{ color: "white", backgroundColor: "black", fontSize: "0.8rem" }} onClick={() => { setCartView(true) }}>MY CART</div>
                  }

                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>: null}
                  <div className="btn text-danger mx-1 rounded-0 linknav" style={{boxShadow:"0px 0px 7px black", fontSize:"0.8rem"}} onClick={logoutHandler}>LOGOUT</div>
                </div>
                }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
