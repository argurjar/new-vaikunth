import axios from "axios"


const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api/admin/" : "/api/admin/";


const Templatetypes = async (Condition, token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.get(API_URL+`getAllTemplatetypes?per_page=1000`, config)

    return response.data
 }




const AddTemplatetype =async(Templatetypesdata,token)=>{
   

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "addTemplatetype", Templatetypesdata, config) 

    return response.data
 }






const DeleteTemplatetype = async (id, token) => {
 
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.delete(API_URL + "deleteTemplatetype/" + id, config)

    return response.data
 }



const SingelTemplatetype = async (id, token) => {
 
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + "getTemplatetype/" + id, config)

    return response.data
 }



const updateTemplatetype = async (Templatetypesdata, token) => { 
    
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + "updateTemplatetype/" + Templatetypesdata.id, Templatetypesdata, config)
  
    return response.data
 }






export const TemplatetypeService ={
    Templatetypes,AddTemplatetype,DeleteTemplatetype,SingelTemplatetype,updateTemplatetype
}