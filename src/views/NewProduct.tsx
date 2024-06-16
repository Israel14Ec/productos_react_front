import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm'

//En una acción siempre se debe retornar algo
export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    //Retorno al componente
    if(error.length) {
        return error
    }

    await addProduct(data)

    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string //Hook para recibir los datos de la función que llamo en el router con action

  return (
    <>
        <div className=' flex justify-between'>
            <h2 className=' text-2xl font-bold text-slate-500'>Registrar Producto</h2>
            <Link
                to="/"
                className=' rounded-lg bg-indigo-400 p-3 text-sm font-bold text-white hover:bg-indigo-500'
            >
                Volver a productos
            </Link>
        </div>

        {error && 
            <ErrorMessage>
                {error}
            </ErrorMessage>}
        <Form
            className="mt-10"   
            method='POST'   
        >
        
            <ProductForm/>
            
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
        </Form>
    </>
  )
}
