import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product

}

export async function action ({params}: ActionFunctionArgs) {
    
    if(params.id !== undefined) {
        await deleteProduct(+params.id) //Esperamos que se ejecute para redireccionar
    }
  
    return redirect('/') //Redirige a la pagina principal
}

export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

  return (

    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            { product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            { formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method='POST'>
                <button
                    type='submit'
                    name='id'
                    value={product.id.toString()}
                    className={`${isAvailable ? 'text-blue-500': 'text-red-500'} 
                     rounded-lg p-2 text-xs uppercase font-bold w-full border border-gray-200`}
                >
                    { isAvailable ? 'Disponible': 'No disponible'}
                </button>
            </fetcher.Form>
           
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className=" flex gap-2 items-center">
            

            <button 
                onClick={ () => navigate(`productos/${product.id}/edit`)}
                className=' bg-green-500 hover:bg-green-400 rounded-lg text-white w-full py-1 uppercase font-bold text-xs text-center'
                    
            >    
                    Editar
            </button>

            <Form 
                className=' w-full' 
                method='POST' 
                onSubmit={
                    //El onsubmit se ejecuta antes que el accion
                    (e) => {
                    if( !confirm('Eliminar?')) {
                        e.preventDefault()
                    }
                } }
                action={`productos/${product.id}/delete`}    
            >
                <input
                    type='submit'
                    className=' bg-red-500 hover:bg-red-400 rounded-lg text-white w-full py-1 uppercase font-bold text-xs text-center'
                    value="Eliminar"
                />

            </Form>
            
            {
                /*
                EJEMPLO PARA PASAR TODO EL STATE CON LA URL
                <button 
                    onClick={ () => navigate(`productos/${product.id}/edit`, {
                        state: { //Le paso la información
                            product
                        }
                    })}
                    className=' bg-green-500 hover:bg-green-400 rounded-lg text-white w-full py-1 uppercase font-bold text-xs text-center'
                        
                >    
                        Editar
                </button>
                */
            }

                {
                    /** -----REDIRECCIONAR CON LINK
                     * 
                     *  <Link 
                            className=' bg-green-500 hover:bg-green-400 rounded-lg text-white w-full py-1 uppercase font-bold text-xs text-center'
                             to={`productos/${product.id}/edit`}>
                    
                            Editar
                        </Link>
                     */
                }
       
            </div>
        </td>
    </tr> 
  )
}
