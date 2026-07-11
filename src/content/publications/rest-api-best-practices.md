---
title: "REST API Best Practices for Backend Developers"
type: "article"
summary: "Exploración de los principios y patrones más importantes para diseñar APIs REST escalables, mantenibles y seguras, con ejemplos prácticos en Java Spring Boot."
publishedAt: "2025-05-01"
tags: ["REST", "Spring Boot", "Backend", "API Design"]
draft: false
---

## Introducción

REST (Representational State Transfer) se ha convertido en el estilo arquitectónico dominante para construir APIs web. A pesar de su adopción generalizada, muchas APIs sufren de decisiones de diseño inconsistentes que las hacen difíciles de consumir y mantener.

En este artículo exploraremos los principios fundamentales que todo desarrollador backend debería aplicar al diseñar APIs REST.

---

## 1. Nomenclatura de Recursos

Usa **sustantivos**, no verbos. Los recursos deben representar entidades, no acciones:

```
✅ GET /users/42/orders
❌ GET /getUserOrders?userId=42
```

Los recursos en plural son la convención más aceptada:

```
✅ /products
✅ /users/42/addresses
❌ /product
❌ /getUser
```

---

## 2. Métodos HTTP y Códigos de Estado

| Método | Uso | Código éxito |
|--------|-----|--------------|
| `GET` | Obtener recurso | `200 OK` |
| `POST` | Crear recurso | `201 Created` |
| `PUT` | Reemplazar recurso | `200 OK` |
| `PATCH` | Actualización parcial | `200 OK` |
| `DELETE` | Eliminar recurso | `204 No Content` |

---

## 3. Versionado

Siempre versiona tu API desde el inicio. La estrategia más común es por URI:

```
/api/v1/users
/api/v2/users
```

---

## 4. Autenticación y Autorización

Usa **JWT** o **OAuth 2.0** para autenticación stateless. Nunca pases credenciales en parámetros de URL.

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
}
```

---

## 5. Manejo de Errores

Devuelve respuestas de error estructuradas y consistentes:

```json
{
  "timestamp": "2025-05-01T10:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "User with id 42 not found",
  "path": "/api/v1/users/42"
}
```

---

## 6. Paginación y Filtrado

```
GET /api/v1/products?page=0&size=20&sort=createdAt,desc&category=electronics
```

Respuesta recomendada:

```json
{
  "content": [...],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8
}
```

---

## Conclusión

Una API REST bien diseñada es la base de cualquier sistema backend escalable. Aplicar estas prácticas desde el inicio reduce la deuda técnica y mejora la experiencia del consumidor de la API.
