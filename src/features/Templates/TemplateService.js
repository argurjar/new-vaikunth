import axios from "axios"


const API_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL + "/api/" : "/api/";


const Templates = async (Condition, token) => {
   
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.get(API_URL+`getAllTemplates`, config)

    return response.data
 }




const AddTemplates =async(Templatesdata,token)=>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "addTemplate", Templatesdata, config) 
    return response.data
 }






const DeleteTemplates = async (id, token) => {
    
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     const response = await axios.delete(API_URL + "deleteTemplate/" + id, config)
 
    return response.data
 }



 const SingelTemplate =async(id,token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+"getTemplate/"+id, config)
    return response.data
 }



const updateTemplate = async (Templatesdata, token) => { 
    
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + "updateTemplate/" + Templatesdata.id, Templatesdata, config)
  
    return response.data
 }






export const TemplateService ={
    Templates,AddTemplates,DeleteTemplates,SingelTemplate,updateTemplate
}