import React from 'react'
import {useState} from 'react'

const Table = () => {
    
    const [products, setProducts] = useState([
        {id: 1, name: "Tip-top", hsn: "55132300", days:Array(31).fill(0)},
        {id: 2, name:"2 X 2 kohinoor", hsn:"52083180", days:Array(31).fill(0)}
    ])
  return (
    <>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th># HSN CODE</th>
                    {[...Array(31)].map((_ , i)=>(
                        <th key={i}>{i + 1}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product)=>{
                        const total = product.days.reduce((a,b)=> a + b , 0)

                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.hsn}</td>
                                {
                                    product.days.map((value, i)=> 
                                        (
                                            <td key={i}>
                                                <input
                                                 type="number"
                                                 value={value}
                                                //  onChange={(e)=>handleInput(product.id, i, e.target.value)}
                                                 />
                                            </td>
                                       )
                                    )
                                }

                                <td>{total}</td>
                            </tr>
                        )
                    })
                    
                }
                
                <tr></tr>
            </tbody>
        </table>
    </>
  )
}

export default Table