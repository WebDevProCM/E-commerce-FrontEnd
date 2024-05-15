import React, { createContext } from "react";
import perfumes from '../components/assets/perfumes.json';

export const perfumeContext = createContext(null);

const perfumeContextProvider = (props) =>{
    const contextValue = {perfumes};

    return(
        <perfumeContext.Provider value={contextValue}>
            {props.children}
        </perfumeContext.Provider>
    )
}

export default perfumeContextProvider