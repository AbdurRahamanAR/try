import React from 'react'

export default function SearchRestaurantCard({restaurant, handleSelectItem}) {
  return (
    <div
      style={{
        width: "calc(100% - 30px)",
        textAlign: "left",
        paddingBottom: 15,
        boxSizing: "border-box"
      }}
    >
      <div style={{display: "flex", marginBottom: 10, alignItems: "center"}}>
        <img 
          style={{width: 50, height: 50, marginRight: 10}} 
          src={restaurant.LogoPath} 
          alt={restaurant.Name} 
        /> 
        <p style={{fontSize: 18}}>
          {restaurant.Name} - {restaurant.Suburb} - rated #{" "}
          {restaurant.Rank} overall 
        </p>
      </div>
     
      <div>
        {restaurant.matchesMenuItems.map((menuItem) => {
          return (
            <label 
              key={menuItem.Id} 
              style={{ 
                display: "block", 
                fontSize: 16, 
                marginBottom: 15
              }}
            >
              <input
                type="checkbox"
                name={menuItem.Name}
                value={menuItem.Id}
                onChange={()=> {
                  handleSelectItem(menuItem)
                }}
              />
              <span>&nbsp;{menuItem.Name}.</span>&nbsp;
              <span>R{menuItem.Price}</span>
            </label>
          );
        })}
      </div>
    </div>
  )
}
