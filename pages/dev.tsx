import { Category } from "@/isaac/models"
import { useEffect, useState } from "react";

export default function DevTools() {
  return (
    <div>
      <h1>Dev Tools</h1>
      <CategoryTool />
    </div>
  )
}

function CategoryTool() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/category?sort_type=alphabetical')
        .then(res => res.json())
        .then(data => setCategories(data.payload));
    }, []);

  // TODO: Comment out Session code from api/category
  const onCreateCategory = async (e: any) => {
    e.preventDefault()
    await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target.categoryName.value
      })
    })
    .then(() => location.reload())
    .catch((err) => alert(err))
  }

  return (
    <>
      <h3>Category</h3>
      <form onSubmit={onCreateCategory}>
        <input type="text" name="categoryName" />
        <button type="submit">Create</button>
      </form>
      <>{categories.length === 0 ? "None" : categories.map(c => <div key={c.id}>{c.name}</div>)}</>
    </>
  )
}