import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import { Product } from '../types'

export async function loader () {
  const products = await getProducts()
  return products
}

export async function action({request} : ActionFunctionArgs) {
  const {id} = Object.fromEntries(await request.formData())
  await updateAvailability(+id) //Espera que se complete la función

  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[] //Hook para recibir los datos de la función que llamo en el router con loader

  return (
    <>
      <div className=' flex justify-between'>
          <h2 className=' text-2xl font-bold text-slate-500'>Productos</h2>
          <Link
              to="productos/nuevo"
              className=' rounded-lg bg-indigo-400 p-3 text-sm font-bold text-white hover:bg-indigo-500'
          >
              Agregar Productos
          </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            { products.map( (product) => (
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
