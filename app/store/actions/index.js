import Geolocation from '@react-native-community/geolocation';
import * as actionTypes from './actionTypes';
import axios from 'axios'
import mime from 'mime'

const createFormData = (photo, body = {}) => {
    
    const pic = photo.assets[0]
    const newUri = "file:///"+ pic.uri.split("file:/").join("")
   
      const data = new FormData();
    
      data.append('photo', {
        name: newUri.split("/").pop(),
        type: mime.getType(newUri),
        uri: newUri,
      });
    
      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
  
  
      });
    
      return data;
    };

    
    const authStart = () => {
        return {
            type: actionTypes.AUTH_START
        }
    }
    
     const authSuccess = (payload) => {
        return {
            type:actionTypes.AUTH_SUCCESS,
            payload
        }
    }
    
     const authFail = (payload) => {
        return {
            type: actionTypes.AUTH_FAIL,
            payload
        };
    };
    
    
    export const authRefresh = () => {
        return {
            type: actionTypes.AUTH_REFRESH
        };
    };
    
    
    
    export const authenticated =({email, password})=> {
    
        return (dispatch)=>{
            dispatch(authStart())
            axios.post('https://smartct.herokuapp.com/smartct/login/action',{email, password}).then((response)=>{
                
                setTimeout(()=> {dispatch(authSuccess(response.data))},2000)
                
            }).catch((error)=>{
                dispatch(authFail(error.response ? error.response.data.msg :'Network Error'))
            })
    
        }
    }
    
   
//DRIVERS LOCATION

  const getDriverPositionStart = () => {
    return {
        type: actionTypes.GET_DRIVERS_LOCATION_START
    }
}

 const getDriverPositionSuccess = (payload) => {
    return {
        type:actionTypes.GET_DRIVERS_LOCATION_SUCCESS,
        payload
    }
}

 const getDriverPositionFail = (payload) => {
    return {
        type: actionTypes.GET_DRIVERS_LOCATION_FAIL,
        payload
    };
};


export const getDriverPositionRefresh = () => {
    return {
        type: actionTypes.GET_DRIVERS_LOCATION_REFRESH
    };
};
 export const getDriversCurrentLocation = ()=>{

    return (dispatch) => {
        dispatch(getDriverPositionStart())
        Geolocation.getCurrentPosition((position)=>{
        dispatch(getDriverPositionSuccess(position.coords));
        },
        ()=> setTimeout(()=> dispatch(getDriverPositionFail('Network Error')),2100) ,
        {enableHightAccuracy: true, timeout: 2000, maximumAge: 1000})
    }
    
}


const addFoodMenuStart = () => {
    return {
        type: actionTypes.ADD_MENU_START
    }
}

 const addFoodMenuSuccess = (payload) => {
    return {
        type:actionTypes.ADD_MENU_SUCCESS,
        payload
    }
}

 const addFoodMenuFail = (payload) => {
    return {
        type: actionTypes.ADD_MENU_FAIL,
        payload
    };
};


export const addFoodMenuRefresh = () => {
    return {
        type: actionTypes.ADD_MENU_REFRESH
    };
};



export const addFoodMenu =({photo, menuName, menuType})=> {

    return (dispatch)=>{
        dispatch(addFoodMenuStart())
       
        axios.post('https://smartct.herokuapp.com/smartct/restaurant/food/menu',createFormData(photo,{menuName, menuType})).then((response)=>{
            dispatch(addFoodMenuSuccess(response.data))
            setTimeout(()=>{
                dispatch(getFoodMenus())
            },1000) 
        }).catch((error)=>{
            console.log(error.response,'err')
            dispatch(addFoodMenuFail(error.response ? error.response.data.msg :'Network Error'))
        })

    }
}



const getFoodMenuStart = () => {
    return {
        type: actionTypes.GET_MENU_START
    }
}

 const getFoodMenuSuccess = (payload) => {
    return {
        type:actionTypes.GET_MENU_SUCCESS,
        payload
    }
}

 const getFoodMenuFail = (payload) => {
    return {
        type: actionTypes.GET_MENU_FAIL,
        payload
    };
};



export const getFoodMenuRefresh = () => {
    return {
        type: actionTypes.GET_MENU_REFRESH
    };
};


export const getFoodMenus =()=> {

    return (dispatch)=>{
        dispatch(getFoodMenuStart())
        axios.get('https://smartct.herokuapp.com/smartct/restaurant/food/menus').then((response)=>{
            setTimeout(()=>{
            dispatch(getFoodMenuSuccess(response.data))
            },1000)
            
        }).catch((error)=>{
            
            if(error)  dispatch(getFoodMenuFail(error.response !== undefined ? error.response.data.msg :'Network Error'))
        })

    }
}



const addFoodMenuCategoriesStart = () => {
    return {
        type: actionTypes.ADD_MENU_CATEGORY_START
    }
}

 const addFoodMenuCategoriesSuccess = (payload) => {
    return {
        type:actionTypes.ADD_MENU_CATEGORY_SUCCESS,
        payload
    }
}

 const addFoodMenuCategoriesFail = (payload) => {
    return {
        type: actionTypes.ADD_MENU_CATEGORY_FAIL,
        payload
    };
};


export const addFoodMenuCategoriesRefresh = () => {
    return {
        type: actionTypes.ADD_MENU_CATEGORY_REFRESH
    };
};


export const addFoodMenuCategory =({photo, categoryName, menuId, calory, price, description})=> {
    return (dispatch)=>{
        dispatch(addFoodMenuCategoriesStart())
        axios.post('https://smartct.herokuapp.com/smartct/restaurant/food/category',createFormData(photo, {categoryName, menuId, calory, price, description})).then((response)=>{
            dispatch(addFoodMenuCategoriesSuccess(response.data))
        setTimeout(()=>{
            dispatch(getFoodMenus())
        },1000)    
        
        }).catch((error)=>{
            if(error)  dispatch(addFoodMenuCategoriesFail(error.response !== undefined ? error.response.data.msg :'Network Error'))
        })

    }
}



const getBusinessStart = () => {
    return {
        type: actionTypes.GET_BUSINESS_START
    }
}

 const getBusinessSuccess = (payload) => {
    return {
        type:actionTypes.GET_BUSINESS_SUCCESS,
        payload
    }
}

 const getBusinessFail = (payload) => {
    return {
        type: actionTypes.GET_BUSINESS_FAIL,
        payload
    };
};


export const getBusinessRefresh = () => {
    return {
        type: actionTypes.GET_BUSINESS_REFRESH
    };
};


export const getBusiness =()=> {

    return (dispatch)=>{
        dispatch(getBusinessStart())
        axios.get('https://smartct.herokuapp.com/smartct/business').then((response)=>{
            dispatch(getBusinessSuccess(response.data))
        }).catch((error)=>{
            console.log(error,'err')
            if(error)  dispatch(getBusinessFail(error.response !== undefined ? error.response.data.msg :'Network Error'))
        })

    }
}



const addBusinessStart = () => {
    return {
        type: actionTypes.ADD_BUSINESS_START
    }
}

 const addBusinessSuccess = (payload) => {
    return {
        type:actionTypes.ADD_BUSINESS_SUCCESS,
        payload
    }
}

 const addBusinessFail = (payload) => {
    return {
        type: actionTypes.ADD_BUSINESS_FAIL,
        payload
    };
};


export const addBusinessRefresh = () => {
    return {
        type: actionTypes.ADD_BUSINESS_REFRESH
    };
};


export const addBusiness =({photo, businessName, typeofBusiness, location, latitude, longitude, email, phoneNumber, description, password})=> {

    return (dispatch)=>{
        dispatch(addBusinessStart())
        axios.post('https://smartct.herokuapp.com/smartct/business',createFormData(photo, {businessName, typeofBusiness, location, latitude, longitude ,email, phoneNumber, description, password})).then((response)=>{
            dispatch(addBusinessSuccess(response.data))
        setTimeout(()=>{
            dispatch(getBusiness())
        },1000)    
        
        }).catch((error)=>{
            console.log(error.response,'err')
            if(error)  dispatch(addBusinessFail(error.response !== undefined ? error.response.data.msg :'Network Error'))
        })

    }
}


const addUserStart = () => {
    return {
        type: actionTypes.ADD_USER_START
    }
}

 const addUserSuccess = (payload) => {
    return {
        type:actionTypes.ADD_USER_SUCCESS,
        payload
    }
}

 const addUserFail = (payload) => {
    return {
        type: actionTypes.ADD_USER_FAIL,
        payload
    };
};


export const addUserRefresh = () => {
    return {
        type: actionTypes.ADD_USER_REFRESH
    };
};


export const addUser =({name, email, password})=> {

    return (dispatch)=>{
        dispatch(addUserStart())
        axios.post('https://smartct.herokuapp.com/smartct/register/action',{name, email, password}).then((response)=>{
            dispatch(addUserSuccess(response.data))    
        
        }).catch((error)=>{
            console.log(error.response,'user')
            if(error)  dispatch(addUserFail(error.response !== undefined ? error.response.data.msg :'Network Error'))
        })

    }
}


// categoryName, menuId, calory, price, description