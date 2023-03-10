import SHOP_DATA from '../../shop-data.json'

const Shop = ()=>{
 return(
    <div>
        {SHOP_DATA.map(product => (
            <div>
                <h1>{product.name}</h1>
            </div>
        ))}
    </div>
 )
}

export default Shop