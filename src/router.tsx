import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailability } from './views/Products'
import NewProduct, {action as newProductAction} from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProducAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader, //Cuando carga el componente llama a la función
                action: updateAvailability
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction //Acción del formulario
            },
            {
                path: 'productos/:id/edit', // RDA Pattern - Resouce Oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/delete',
                action: deleteProducAction
            }
        ]
    }
])