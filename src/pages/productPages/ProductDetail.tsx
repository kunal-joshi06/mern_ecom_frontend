import { useParams } from "react-router-dom"


const ProductDetail = () => {
    const { pId } = useParams()
    return (
        <div>{pId}</div>
    )
}

export default ProductDetail