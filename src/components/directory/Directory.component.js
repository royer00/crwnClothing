import './Directory.styles.scss'
import CategoryItem from '../category-item/Category-item.component'

const Directory = ({categories}) => {
    return(
        <div className="directory-container">
        {categories.map((category) => {
          return (
          <CategoryItem key={category.id} category={category}/>
          )
        })}
      </div>
    )
}

export default Directory;