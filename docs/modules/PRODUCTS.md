 # Documentación del Módulo de Productos

## Descripción General
El módulo de Productos proporciona una plataforma completa para la gestión de productos y servicios, incluyendo catálogo, precios, variantes y gestión de stock.

## Características

### 1. Gestión de Productos
- Creación y edición de productos
- Gestión de variantes
- Categorización
- Gestión de precios
- Imágenes y multimedia

### 2. Catálogo
- Organización jerárquica
- Filtros avanzados
- Búsqueda inteligente
- Vista de cuadrícula y lista
- Exportación de datos

### 3. Precios y Stock
- Gestión de precios por variante
- Precios especiales y descuentos
- Control de inventario
- Alertas de stock
- Historial de precios

## Componentes

### 1. Componente ProductList
Vista principal del catálogo de productos.

```typescript
interface ProductListProps {
  data: Product[];
  onSort: (column: string) => void;
  onFilter: (filters: ProductFilters) => void;
  onSearch: (query: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
}

interface ProductFilters {
  category?: string;
  status?: ProductStatus;
  priceRange?: {
    min: number;
    max: number;
  };
  stock?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

type ProductStatus = 'active' | 'inactive' | 'draft';
```

### 2. Componente ProductForm
Formulario para crear y editar productos.

```typescript
interface ProductFormProps {
  initialData?: Partial<Product>;
  categories: Category[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  variants?: ProductVariant[];
  images: File[];
  attributes: ProductAttribute[];
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface ProductAttribute {
  name: string;
  value: string;
  type: 'color' | 'size' | 'material' | 'custom';
}
```

### 3. Componente ProductDetails
Vista detallada de producto.

```typescript
interface ProductDetailsProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onVariantUpdate: (variantId: string, data: Partial<ProductVariant>) => Promise<void>;
}
```

## Modelos de Datos

### Modelo de Producto
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: Category;
  status: ProductStatus;
  price: {
    amount: number;
    currency: string;
    compareAt?: number;
  };
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  images: ProductImage[];
  stock: {
    quantity: number;
    minQuantity: number;
    maxQuantity?: number;
  };
  metadata: {
    seo: SEOData;
    ratings: RatingData;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  type: 'main' | 'gallery' | 'thumbnail';
  metadata: {
    width: number;
    height: number;
    size: number;
  };
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
}

interface RatingData {
  average: number;
  count: number;
  distribution: Record<number, number>;
}
```

## Endpoints de API

```typescript
const PRODUCT_ENDPOINTS = {
  products: {
    list: '/api/products',
    create: '/api/products',
    update: '/api/products/:id',
    delete: '/api/products/:id',
    details: '/api/products/:id/details',
    variants: '/api/products/:id/variants'
  },
  categories: {
    list: '/api/products/categories',
    create: '/api/products/categories',
    update: '/api/products/categories/:id',
    delete: '/api/products/categories/:id'
  },
  images: {
    upload: '/api/products/images',
    update: '/api/products/images/:id',
    delete: '/api/products/images/:id'
  }
};
```

## Gestión de Estado

### Estado de Productos
```typescript
interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  categories: Category[];
  filters: ProductFilters;
  loading: boolean;
  error: Error | null;
}

type ProductAction =
  | { type: 'FETCH_PRODUCTS_START' }
  | { type: 'FETCH_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_PRODUCTS_ERROR'; payload: Error }
  | { type: 'SELECT_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'UPDATE_VARIANT'; payload: { productId: string; variant: ProductVariant } };
```

## Hooks Personalizados

### useProduct Hook
```typescript
const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productData, variantsData] = await Promise.all([
          fetch(`/api/products/${productId}`),
          fetch(`/api/products/${productId}/variants`)
        ]);
        
        setProduct(await productData.json());
        setVariants(await variantsData.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  return { product, variants, loading, error };
};
```

## Utilidades

### Gestión de Precios y Stock
```typescript
const calculateVariantPrice = (
  basePrice: number,
  variant: ProductVariant
): number => {
  let price = basePrice;
  
  // Aplicar ajustes de precio por atributos
  Object.entries(variant.attributes).forEach(([attr, value]) => {
    const adjustment = getPriceAdjustment(attr, value);
    price += adjustment;
  });
  
  return price;
};

const updateProductStock = async (
  productId: string,
  variantId: string,
  quantity: number,
  type: 'increment' | 'decrement'
): Promise<void> => {
  try {
    await fetch(`/api/products/${productId}/variants/${variantId}/stock`, {
      method: 'POST',
      body: JSON.stringify({ quantity, type })
    });
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    throw error;
  }
};
```

## Manejo de Errores

```typescript
interface ProductError extends Error {
  code: 'PRODUCT_NOT_FOUND' | 'INVALID_SKU' | 'STOCK_ERROR';
  details?: Record<string, any>;
}

const handleProductError = (error: ProductError) => {
  switch (error.code) {
    case 'PRODUCT_NOT_FOUND':
      // Manejar producto no encontrado
      break;
    case 'INVALID_SKU':
      // Manejar SKU inválido
      break;
    case 'STOCK_ERROR':
      // Manejar error de stock
      break;
    default:
      // Manejar error desconocido
  }
};
```

## Pruebas

### Pruebas Unitarias
```typescript
describe('Utilidades de Producto', () => {
  describe('calculateVariantPrice', () => {
    it('debería calcular el precio de variante correctamente', () => {
      const basePrice = 100;
      const variant = {
        attributes: {
          size: 'XL',
          color: 'premium'
        }
      };
      
      expect(calculateVariantPrice(basePrice, variant)).toBe(120);
    });
  });
});
```

### Pruebas de Integración
```typescript
describe('ProductForm', () => {
  it('debería crear un producto con variantes', async () => {
    const { getByTestId, findByText } = render(<ProductForm />);
    
    // Llenar datos básicos
    fireEvent.change(getByTestId('product-name'), {
      target: { value: 'Nuevo Producto' }
    });
    
    // Agregar variante
    fireEvent.click(getByTestId('add-variant'));
    
    // Verificar creación
    await findByText('Producto creado exitosamente');
  });
});
```

## Consideraciones de Rendimiento

1. **Optimización de Imágenes**
   - Compresión automática
   - Generación de miniaturas
   - Carga diferida
   - Formatos optimizados

2. **Caché y Almacenamiento**
   - Caché de productos frecuentes
   - Almacenamiento local de filtros
   - Precarga de datos relacionados

3. **Optimizaciones de UI**
   - Virtualización de listas
   - Carga progresiva de imágenes
   - Paginación eficiente

## Seguridad

1. **Validación de Datos**
   - Validación de SKUs únicos
   - Verificación de precios
   - Validación de imágenes
   - Sanitización de datos

2. **Control de Acceso**
   - Permisos por categoría
   - Restricciones de edición
   - Auditoría de cambios

## Guía de Solución de Problemas

1. **Problemas Comunes**
   - Duplicación de SKUs
   - Inconsistencias de stock
   - Errores de precio
   - Problemas de imágenes

2. **Soluciones**
   - Verificación de unicidad
   - Reconciliación de stock
   - Validación de precios
   - Optimización de imágenes