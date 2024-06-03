import React, {useState, createContext} from "react";

export const ResturantsContext = createContext()

export const ResturantsContextProvider = props => {
        const [restaurants, setResturants] = useState([])

    
    
    return (
        <ResturantsContext.Provider value={{restaurants, setResturants}}>
            {props.children}
        </ResturantsContext.Provider>
    )
}