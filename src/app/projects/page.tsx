export default function Projects() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Proyectos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los proyectos y su estado actual.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Nuevo proyecto
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow-sm ring-1 ring-gray-300 rounded-lg p-4">
          <p className="text-gray-500 text-sm">No hay proyectos activos</p>
        </div>
      </div>
    </div>
  );
} 