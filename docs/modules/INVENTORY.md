# Documentación del Módulo de Inventario

## Descripción General
El módulo de Inventario proporciona herramientas completas para gestionar el inventario de productos, realizar seguimiento de niveles de stock y monitorear el valor del inventario.

## Características

### 1. Gestión de Productos
- Agregar, editar y eliminar productos
- Seguimiento de niveles de stock
- Configurar alertas de stock bajo
- Gestionar categorías de productos
- Gestión de imágenes de productos

### 2. Seguimiento de Stock
- Actualizaciones de stock en tiempo real
- Notificaciones automáticas de stock bajo
- Historial y tendencias de stock
- Cálculos de valor de stock

### 3. Gestión de Categorías
- Estructura jerárquica de categorías
- Filtrado basado en categorías
- Estadísticas por categoría

## Componentes

### 1. Componente InventoryTable
Componente principal para mostrar y gestionar elementos del inventario.

```typescript
interface InventoryTableProps {
  data: InventoryItem[];
  onSort: (column: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface FilterOptions {
  category?: string;
  status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  priceRange?: {
    min: number;
    max: number;
  };
}
```

#### Características
- Ordenamiento de columnas
- Filtrado multi-criterio
- Funcionalidad de búsqueda
- Paginación
- Acciones en lote
- Diseño responsivo

### 2. Componente ProductCard
Muestra información individual de productos.

```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
    image?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

### 3. Componente ProductForm
Formulario para agregar y editar productos.

```typescript
interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  description?: string;
  price: number;
  stock: number;
  minStock: number;
  images?: File[];
}
```

## Modelos de Datos

### Modelo de Producto
```typescript
interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Modelo de Categoría
```typescript
interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Modelo de Historial de Stock
```typescript
interface StockHistory {
  id: string;
  productId: string;
  quantity: number;
  type: 'in' | 'out';
  reason: string;
  date: Date;
  userId: string;
}
```

## Endpoints de API

### Productos
```typescript
const INVENTORY_ENDPOINTS = {
  products: {
    list: '/api/inventory/products',
    create: '/api/inventory/products',
    update: '/api/inventory/products/:id',
    delete: '/api/inventory/products/:id',
    history: '/api/inventory/products/:id/history'
  },
  categories: {
    list: '/api/inventory/categories',
    create: '/api/inventory/categories',
    update: '/api/inventory/categories/:id',
    delete: '/api/inventory/categories/:id'
  }
};
```

## Gestión de Estado

### Estado de Productos
```typescript
interface InventoryState {
  products: Product[];
  categories: Category[];
  filters: FilterOptions;
  loading: boolean;
  error: Error | null;
}
```

### Acciones
```typescript
type InventoryAction =
  | { type: 'FETCH_PRODUCTS_START' }
  | { type: 'FETCH_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_PRODUCTS_ERROR'; payload: Error }
  | { type: 'UPDATE_FILTERS'; payload: FilterOptions }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string };
```

## Hooks

### Hook useInventory
```typescript
const useInventory = () => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  
  const fetchProducts = useCallback(async () => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    try {
      const response = await fetch('/api/inventory/products');
      const data = await response.json();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error });
    }
  }, []);

  return {
    ...state,
    fetchProducts,
    updateFilters: (filters: FilterOptions) => 
      dispatch({ type: 'UPDATE_FILTERS', payload: filters })
  };
};
```

## Utilidades

### Cálculos de Stock
```typescript
const calculateStockValue = (products: Product[]): number => {
  return products.reduce((total, product) => 
    total + (product.price * product.stock), 0);
};

const determineStockStatus = (
  currentStock: number,
  minStock: number
): 'in_stock' | 'low_stock' | 'out_of_stock' => {
  if (currentStock === 0) return 'out_of_stock';
  if (currentStock <= minStock) return 'low_stock';
  return 'in_stock';
};
```

## Manejo de Eventos

### Actualizaciones de Stock
```typescript
const handleStockUpdate = async (
  productId: string,
  quantity: number,
  type: 'in' | 'out'
) => {
  try {
    await fetch(`/api/inventory/products/${productId}/stock`, {
      method: 'POST',
      body: JSON.stringify({ quantity, type })
    });
    // Actualizar estado local
  } catch (error) {
    // Manejar error
  }
};
```

## Manejo de Errores

```typescript
interface InventoryError extends Error {
  code: 'STOCK_UPDATE_FAILED' | 'PRODUCT_NOT_FOUND' | 'INVALID_QUANTITY';
  details?: Record<string, any>;
}

const handleInventoryError = (error: InventoryError) => {
  switch (error.code) {
    case 'STOCK_UPDATE_FAILED':
      // Manejar fallo de actualización de stock
      break;
    case 'PRODUCT_NOT_FOUND':
      // Manejar producto no encontrado
      break;
    case 'INVALID_QUANTITY':
      // Manejar cantidad inválida
      break;
    default:
      // Manejar error desconocido
  }
};
```

## Pruebas

### Pruebas Unitarias
```typescript
describe('Utilidades de Inventario', () => {
  describe('calculateStockValue', () => {
    it('debería calcular el valor total correctamente', () => {
      const products = [
        { price: 10, stock: 5 },
        { price: 20, stock: 3 }
      ];
      expect(calculateStockValue(products)).toBe(110);
    });
  });
});
```

### Pruebas de Integración
```typescript
describe('InventoryTable', () => {
  it('debería filtrar productos correctamente', async () => {
    const { getByTestId, findByText } = render(<InventoryTable />);
    
    fireEvent.click(getByTestId('filter-button'));
    fireEvent.click(getByTestId('category-filter'));
    
    await findByText('Resultados Filtrados');
    // Verificar resultados filtrados
  });
});
```

## Consideraciones de Rendimiento

1. **Carga de Datos**
   - Implementar paginación
   - Usar desplazamiento virtual para listas grandes
   - Optimizar carga de imágenes

2. **Actualizaciones de Estado**
   - Actualizaciones por lotes
   - Actualizaciones optimistas
   - Implementar debounce para búsqueda

3. **Caché**
   - Caché de datos de productos
   - Caché de jerarquía de categorías
   - Caché de cálculos de stock

## Seguridad

1. **Control de Acceso**
   - Permisos basados en roles
   - Registro de auditoría
   - Validación de actualizaciones de stock

2. **Validación de Datos**
   - Sanitización de entrada
   - Verificación de niveles de stock
   - Validación de formato de precios

## Guía de Solución de Problemas

1. **Problemas Comunes**
   - Errores de sincronización de stock
   - Problemas de jerarquía de categorías
   - Problemas de carga de imágenes

2. **Soluciones**
   - Mecanismos de reintento
   - Resolución de conflictos
   - Procedimientos de recuperación de datos 