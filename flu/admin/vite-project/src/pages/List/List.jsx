import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify" 

const List = () => {
    const url = 'http://localhost:4000'  
    const [list, setList] = useState([])
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response.data); 
        
        if(response.data.success){
            setList(response.data.data) 
        }
        else{
            toast.error ("Error")
        } 
    } 
    useEffect(()=>{
        fetchList();
    },[])
    const deleteFood = async(foodId)=>{
        const response = await axios.post(`${url}/api/food/delete`, {id:foodId})
        await fetchList();    
        if(response.data.success)    
            {
                toast.success("Food deleted successfully")
                }
                else{
                    toast.error("Error")
                    }
    }
  return (
    <div className='list add flex-col'>
        <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item, index) => {
            return(
                <div key={index} className="list-table-format">  
                <img src={`${url}/images/`+item.image} alt={item.name} className="list-table-format-image"/>  
                <p className="list-table-format-name">{item.name}</p> 
                <p className="list-table-format-category">{item.category}</p>
                <p className="list-table-format-price">{item.price}</p>
                <p onClick={()=>deleteFood(item._id)} className="list-table-format-action">X</p>    
                </div>
            )
        })}
      </div>
    </div>
  ) 
}

export default List
