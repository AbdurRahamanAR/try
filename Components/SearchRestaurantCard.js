import React from 'react'

export default function SearchRestaurantCard({
  restaurant, 
  handleSelectItem, 
  removeSelectItem,
  selectedItems
}) {

  return (
    <div
      key={restaurant.Id}
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
     
      <div style={{paddingLeft: 20}}>
        {restaurant.matchesCategoriesAndMenuItems?.map((categorie, index)=> {
          return (
            <div key={categorie.Name + index}>
              <p style={{fontWeight:"bold"}}>{categorie.Name}</p>
              <div style={{paddingLeft: 15}}>
                {categorie.MenuItems.map((menuItem) => {
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
                        defaultChecked={
                          !!selectedItems.find(selectedItem=>selectedItem.Id === menuItem.Id)
                        }
                        onChange={(e)=> {
                          if(e.target.checked) {
                            handleSelectItem(menuItem)
                          } else {
                            removeSelectItem(menuItem)
                          }
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
        })}
      </div>
    </div>
  )
}
