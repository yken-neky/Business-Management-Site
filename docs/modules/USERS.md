# Documentación del Módulo de Usuarios

## Descripción General
El módulo de Usuarios proporciona un sistema completo para la gestión de usuarios, roles, permisos y autenticación en la plataforma.

## Características

### 1. Gestión de Usuarios
- Registro y administración de usuarios
- Gestión de perfiles
- Control de acceso basado en roles
- Seguimiento de actividades
- Gestión de sesiones

### 2. Sistema de Roles y Permisos
- Definición de roles personalizados
- Asignación de permisos granulares
- Herencia de roles
- Restricciones de acceso
- Auditoría de permisos

### 3. Autenticación y Seguridad
- Múltiples métodos de autenticación
- Gestión de contraseñas
- Autenticación de dos factores
- Bloqueo de cuentas
- Registro de actividad de seguridad

## Componentes

### 1. Componente UserList
Componente principal para la administración de usuarios.

```typescript
interface UserListProps {
  data: User[];
  onSort: (column: string) => void;
  onFilter: (filters: UserFilters) => void;
  onSearch: (query: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface UserFilters {
  role?: string;
  status?: 'active' | 'inactive' | 'blocked';
  department?: string;
}
```

### 2. Componente UserProfile
Vista y edición del perfil de usuario.

```typescript
interface UserProfileProps {
  user: User;
  onUpdate: (data: Partial<User>) => Promise<void>;
  onPasswordChange: (data: PasswordChangeData) => Promise<void>;
  onAvatarUpdate: (file: File) => Promise<void>;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

### 3. Componente RoleManager
Gestión de roles y permisos.

```typescript
interface RoleManagerProps {
  roles: Role[];
  permissions: Permission[];
  onRoleCreate: (role: RoleData) => Promise<void>;
  onRoleUpdate: (id: string, data: RoleData) => Promise<void>;
  onRoleDelete: (id: string) => Promise<void>;
}

interface RoleData {
  name: string;
  description?: string;
  permissions: string[];
  inheritsFrom?: string[];
}
```

## Modelos de Datos

### Modelo de Usuario
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  department?: string;
  status: 'active' | 'inactive' | 'blocked';
  lastLogin?: Date;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  desktop: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}
```

### Modelo de Rol y Permisos
```typescript
interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  inheritsFrom?: Role[];
  createdAt: Date;
  updatedAt: Date;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}
```

## Endpoints de API

```typescript
const USER_ENDPOINTS = {
  users: {
    list: '/api/users',
    create: '/api/users',
    update: '/api/users/:id',
    delete: '/api/users/:id',
    profile: '/api/users/:id/profile',
    avatar: '/api/users/:id/avatar'
  },
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    password: '/api/auth/password',
    twoFactor: '/api/auth/2fa'
  },
  roles: {
    list: '/api/roles',
    create: '/api/roles',
    update: '/api/roles/:id',
    delete: '/api/roles/:id',
    permissions: '/api/roles/:id/permissions'
  }
};
```

## Gestión de Estado

### Estado de Autenticación
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR'; payload: Error }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN'; payload: string }
  | { type: 'UPDATE_USER'; payload: User };
```

## Hooks Personalizados

### useAuth Hook
```typescript
const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error as Error });
    }
  };

  return {
    ...state,
    login,
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
};
```

## Utilidades

### Gestión de Permisos
```typescript
const checkPermission = (
  user: User,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): boolean => {
  const { role } = user;
  const hasPermission = role.permissions.some(
    (p) => p.resource === resource && p.actions.includes(action)
  );
  
  if (hasPermission) return true;
  
  // Verificar permisos heredados
  return role.inheritsFrom?.some((parentRole) =>
    parentRole.permissions.some(
      (p) => p.resource === resource && p.actions.includes(action)
    )
  ) ?? false;
};
```

## Manejo de Errores

```typescript
interface AuthError extends Error {
  code: 'INVALID_CREDENTIALS' | 'ACCOUNT_BLOCKED' | 'SESSION_EXPIRED';
  details?: Record<string, any>;
}

const handleAuthError = (error: AuthError) => {
  switch (error.code) {
    case 'INVALID_CREDENTIALS':
      // Manejar credenciales inválidas
      break;
    case 'ACCOUNT_BLOCKED':
      // Manejar cuenta bloqueada
      break;
    case 'SESSION_EXPIRED':
      // Manejar sesión expirada
      break;
    default:
      // Manejar error desconocido
  }
};
```

## Pruebas

### Pruebas Unitarias
```typescript
describe('Utilidades de Autenticación', () => {
  describe('checkPermission', () => {
    it('debería verificar permisos correctamente', () => {
      const user = {
        role: {
          permissions: [{
            resource: 'users',
            actions: ['read', 'update']
          }]
        }
      };
      
      expect(checkPermission(user, 'users', 'read')).toBeTruthy();
      expect(checkPermission(user, 'users', 'delete')).toBeFalsy();
    });
  });
});
```

### Pruebas de Integración
```typescript
describe('Login Flow', () => {
  it('debería manejar el proceso de login correctamente', async () => {
    const { getByTestId, findByText } = render(<LoginForm />);
    
    fireEvent.change(getByTestId('email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(getByTestId('password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(getByTestId('submit'));
    
    await findByText('Inicio de sesión exitoso');
  });
});
```

## Consideraciones de Seguridad

1. **Autenticación**
   - Políticas de contraseñas seguras
   - Límites de intentos de inicio de sesión
   - Tokens JWT con rotación
   - Protección contra ataques de fuerza bruta

2. **Autorización**
   - Validación de permisos en cada acción
   - Segregación de roles
   - Principio de mínimo privilegio
   - Auditoría de acciones críticas

3. **Protección de Datos**
   - Encriptación de datos sensibles
   - Sanitización de entradas
   - Validación de datos
   - Protección contra XSS y CSRF

## Rendimiento y Optimización

1. **Caché**
   - Caché de permisos
   - Almacenamiento de sesión
   - Precarga de datos de usuario

2. **Optimizaciones de UI**
   - Carga diferida de componentes
   - Memorización de cálculos de permisos
   - Actualización selectiva de interfaz

## Guía de Solución de Problemas

1. **Problemas Comunes**
   - Errores de inicio de sesión
   - Problemas de permisos
   - Sesiones expiradas
   - Conflictos de roles

2. **Soluciones**
   - Procedimientos de recuperación de cuenta
   - Resolución de conflictos de permisos
   - Gestión de sesiones duplicadas
   - Restauración de acceso 