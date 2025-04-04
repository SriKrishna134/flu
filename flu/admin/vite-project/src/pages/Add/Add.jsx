import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"

// eslint-disable-next-line react/prop-types
const Add = ({url}) => { 
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        price: '',
        description: '',
        category: "Salad"

    })
    const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
}

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", Number(data.price))
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("image", image )
        const response = await axios.post(`${url}/api/food/add`, formData)
        if(response.data.success){
            setData({
                name: '',
                price: '',
                description: '',
                category: "Salad"
        
            })
            setImage(false)
            // alert("Food added successfully") // 
            toString.success(response.data.message)
        }
        else{
            alert("unable to add food")
        }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>    
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image): assets.upload_area} alt="" />
            </label>
            <input onChange={(r)=>setImage(r.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name}  type="text" name="name" placeholder='Type Here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder='Write Here' rows='6' required>

            </textarea>

        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Category</p>
                <select onChange={onChangeHandler} value={data.category} name="category" >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$24' />
            </div>
         </div>
            <button type='submit' className='add-btn'>
                Add Product
            </button>
        </form>
    </div>
  )
}

export default Add
