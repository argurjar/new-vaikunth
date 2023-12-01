import axios from "axios"


const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api/features/" : "/api/features/";

const Features = async (Condition, token) => {
   
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.get(API_URL+`getAllFeatures`, config)

    return response.data
 }




const AddFeature =async(Featuresdata,token)=>{
console.log(Featuresdata,token)
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "addFeature", Featuresdata, config) 
    console.log(response.data)
    return response.data
 }






const DeleteFeatures = async (id, token) => {
    console.log(id)
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.delete(API_URL + "deleteFeature/" + id, config)
 
    return response.data
 }



 const SingelFeature =async(id,token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+"getFeature/"+id, config)
    return response.data
 }



const updateFeature = async (Featuresdata, token) => { 

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + "updateFeature/" + Featuresdata.id, Featuresdata, config)
console.log(response.data)
    return response.data
 }






export const FeatureService ={
    Features,AddFeature ,DeleteFeatures,SingelFeature,updateFeature
}