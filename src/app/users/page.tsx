export default function Users() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los usuarios en el sistema incluyendo sus roles y estado.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Agregar usuario
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Nombre
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Rol
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Estado
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                No hay usuarios registrados
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 