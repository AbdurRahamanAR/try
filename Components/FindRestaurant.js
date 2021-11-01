import { useEffect, useMemo, useState } from "react";

import allResturants from "../mokes/SampleData.json";
import Modal from "./Modal";
import SearchRestaurantCard from "./SearchRestaurantCard";

const normalizedTextForMatch = (text) => {
  return text.trim().toLowerCase();
};

// Get location and itemName from user input
const searchStringToTownAndItemName = (input) => {
  const [item, location] = input.split("in");

  return {
    itemName: normalizedTextForMatch(item || ""),
    location: normalizedTextForMatch(location || "")
  };
};

export default function FindRestaurant() {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState({
    itemName: "",
    location: ""
  });
  const [veiwRestaurants, setVeiwRestaurants] = useState();
  const [selectedItem, setSelectedItem] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const toggleSuccessModal = ()=> setShowSuccessModal(state=>!state)

  const handleSelectItem = (item)=> {
    setSelectedItem(state=>[...state, item])
  }

  useEffect(() => {
    const { itemName, location } = searchData;
      setVeiwRestaurants(() => {
        return allResturants
          .filter((item) => {
            return normalizedTextForMatch(item.City).includes(location);
          })
          .map((item) => {
            let matchesMenuItems = [];
            let found = false;
            item.Categories.forEach((categorie) => {
              if (normalizedTextForMatch(categorie.Name).includes(itemName)) {
                found = true;
                matchesMenuItems = [...matchesMenuItems, ...categorie.MenuItems];
              } else {
                categorie.MenuItems.forEach((menuItem) => {
                  if (normalizedTextForMatch(menuItem.Name).includes(itemName)) {
                    found = true;
                    matchesMenuItems = [...matchesMenuItems, menuItem];
                  }
                });
              }
            });
            if (found) {
              return {
                ...item,
                matchesMenuItems
              };
            }
            return found;
          })
          .filter((item) => item);  
      });
  }, [searchData]);

  const totalPrice = useMemo(()=>{
    let total = 0
    selectedItem.forEach(item=>{
      total += item.Price
    })
    return total
  }, [selectedItem])

  const handleSearchTextChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    setSearchData(searchStringToTownAndItemName(newValue));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(selectedItem.length > 0) {
            toggleSuccessModal()
          } else {
            alert("Please select at least one item.")
          }
        }}
        style={{
          fontFamily: "sans-serif",
          padding: 15
        }}
      >
        <input 
          value={searchInput} 
          onChange={handleSearchTextChange} 
          style={{
            height: 30,
            width: "100%",
            marginBottom: 35,
            paddingLeft: 8
          }}
          placeholder="Burger in crap town"
        />

        {searchData.itemName?.length > 0 && (
          <h4>
            {searchData.itemName} resturnates{" "}
            {searchData.location?.length > 0 ? `in ${searchData.location}` : ""}{" "}
            we found for you:
          </h4>
        )}

        <div>
          {veiwRestaurants &&
            veiwRestaurants.map((restaurant) => {
              return (
                <SearchRestaurantCard 
                  key={restaurant.ID} 
                  restaurant={restaurant} 
                  handleSelectItem={handleSelectItem}
                />
              );
            })}
          {veiwRestaurants?.length === 0 && <h5>No restaurant found</h5>}
        </div>

        <div 
          style={{
            width: "100%", 
            display: 'flex', 
            justifyContent: "center",
            marginTop: 15
          }}
        >
          <button 
            type="submit"
            style={{
              height: 40,
              width: 150,
              background: "#58b758",
              borderRadius: 10,
              color: "#fff",
              border: "none",
              fontSize: 18,
              fontWeight: "bold"
            }}
          >Order - R{totalPrice}</button>
        </div>
      </form>

      <Modal show={showSuccessModal} onClose={toggleSuccessModal}>
        <div style={{display: "flex", paddingBottom: 20, flexDirection: "column", alignItems: "center"}}>
          <div 
            style={{
              borderBottom: '1px solid', 
              width: "100%", 
              padding: 10
            }}
          >
            <p style={{margin: 0, marginLeft: 15, fontSize: 18}}>Success</p>
          </div>
          <p style={{textAlign: "center"}}>Your order has been palced!<br/>
            Leave the rest up to the chefs<br/>
            and our drivers!
          </p>
          
          <button 
            style={{
              width: 150, 
              height: 38, 
              display: "flex", 
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              marginTop: 20,
            }} 
            onClick={toggleSuccessModal}
          >
            <p style={{fontSize: 18}}>Ok</p>
          </button>
        </div>
      </Modal>
    </>
  );
}
