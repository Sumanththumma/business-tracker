import React, { useState } from "react";

export default function Table() {
  const [products, setProducts] = useState([
    { id: 1, name: "Soap", hsn: "3401", days: Array(31).fill(0) },
    { id: 2, name: "Shampoo", hsn: "3305", days: Array(31).fill(0) },
  ]);

  // Update cell values
  const handleInput = (productId, dayIndex, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              days: p.days.map((d, i) =>
                i === dayIndex ? Number(value) || 0 : d
              ),
            }
          : p
      )
    );
  };

  // Add new product row
  const addProduct = () => {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: `Product ${newId}`,
      hsn: "",
      days: Array(31).fill(0),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // Delete product row
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      {/* Add product button */}
      <button
        onClick={addProduct}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ➕ Add Product
      </button>

      {/* Table */}
      <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Product</th>
            <th className="border px-2 py-1">HSN Code</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i} className="border px-2 py-1">{i + 1}</th>
            ))}
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              {/* Editable product name */}
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((x) =>
                        x.id === p.id ? { ...x, name: e.target.value } : x
                      )
                    )
                  }
                  className="border p-1 w-full"
                />
              </td>

              {/* Editable HSN */}
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={p.hsn}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((x) =>
                        x.id === p.id ? { ...x, hsn: e.target.value } : x
                      )
                    )
                  }
                  className="border p-1 w-full"
                />
              </td>

              {/* 31 day inputs */}
              {p.days.map((d, i) => (
                <td key={i} className="border px-2 py-1">
                  <input
                    type="number"
                    value={d}
                    onChange={(e) => handleInput(p.id, i, e.target.value)}
                    className="w-16 p-1 border"
                  />
                </td>
              ))}

              {/* Total */}
              <td className="border px-2 py-1 font-bold">
                {p.days.reduce((a, b) => a + b, 0)}
              </td>

              {/* Delete button */}
              <td className="border px-2 py-1">
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
