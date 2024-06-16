import { PropsWithChildren } from "react";


export default function ErrorMessage({children} : PropsWithChildren) {
  return ( 
    <div className="mx-auto text-sm text-center mb-4 mt-10 bg-red-600 text-white font-bold py-2 uppercase w-1/2 rounded-lg">
        { children }
    </div>
  )
}
