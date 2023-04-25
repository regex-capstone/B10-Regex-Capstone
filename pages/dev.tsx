import useCategory from "@/hooks/useCategory"
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
  const { data: categoryData } = useCategory();

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.payload)
    }
  }, [categoryData])

  // TODO: Comment out Session code from api/category
  const onCreateCategory = async (e: any) => {
    e.preventDefault()
    await fetch("/api/category", {
      method: "POST",
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
      <>{categories.length === 0 ? "None" : categories.map(c => <div>{c.name}</div>)}</>
    </>
  )
}