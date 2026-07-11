---
title: "Análisis de Complejidad en Algoritmos de Ordenamiento"
type: "paper"
summary: "Estudio comparativo de la complejidad temporal y espacial de los principales algoritmos de ordenamiento, con análisis matemático formal usando notación asintótica."
publishedAt: "2025-04-10"
tags: ["Algorithms", "Complexity", "Big-O", "Computer Science"]
draft: false
---

## Resumen

El análisis de complejidad algorítmica es fundamental en la ingeniería de software para evaluar la eficiencia de soluciones computacionales. Este paper analiza los algoritmos de ordenamiento más comunes mediante notación asintótica.

---

## 1. Notación Asintótica

La **notación Big-O** describe el comportamiento de una función cuando el argumento tiende a infinito. Formalmente:

$$
f(n) = O(g(n)) \iff \exists \, c > 0, \, n_0 \in \mathbb{N} : \forall n \geq n_0, \, f(n) \leq c \cdot g(n)
$$

De forma análoga, la notación $\Omega$ define una cota inferior:

$$
f(n) = \Omega(g(n)) \iff \exists \, c > 0, \, n_0 : f(n) \geq c \cdot g(n) \quad \forall n \geq n_0
$$

Y $\Theta$ cuando ambas cotas coinciden:

$$
f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \;\land\; f(n) = \Omega(g(n))
$$

---

## 2. Algoritmos Analizados

### 2.1 Merge Sort

Merge Sort divide el arreglo en mitades recursivamente. Su recurrencia es:

$$
T(n) = 2T\!\left(\frac{n}{2}\right) + O(n)
$$

Aplicando el **Teorema Maestro** con $a = 2$, $b = 2$, $f(n) = n$:

$$
\log_b a = \log_2 2 = 1 \implies f(n) = \Theta(n^{\log_b a}) \implies T(n) = \Theta(n \log n)
$$

### 2.2 Quick Sort

En el caso promedio, Quick Sort produce particiones balanceadas:

$$
T(n) = T(k) + T(n - k - 1) + \Theta(n)
$$

Para $k = \frac{n}{2}$ (caso promedio):

$$
T(n) = \Theta(n \log n)
$$

En el **peor caso** (arreglo ya ordenado con pivote en extremo):

$$
T(n) = T(n-1) + \Theta(n) = \Theta(n^2)
$$

### 2.3 Heap Sort

La construcción del heap toma:

$$
\sum_{i=1}^{\lfloor \log n \rfloor} \left\lfloor \frac{n}{2^i} \right\rfloor \cdot i \leq n \sum_{i=1}^{\infty} \frac{i}{2^i} = 2n = O(n)
$$

Por tanto la complejidad total es $O(n \log n)$ en todos los casos.

---

## 3. Tabla Comparativa

| Algoritmo | Mejor caso | Caso promedio | Peor caso | Espacio |
|-----------|-----------|---------------|-----------|---------|
| Merge Sort | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ |
| Quick Sort | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$ | $O(\log n)$ |
| Heap Sort | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(1)$ |
| Insertion Sort | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ |

---

## 4. Cota Inferior para Ordenamiento por Comparación

**Teorema:** Todo algoritmo de ordenamiento basado en comparaciones requiere al menos $\Omega(n \log n)$ comparaciones en el peor caso.

**Demostración:** El árbol de decisión de un algoritmo sobre $n$ elementos tiene exactamente $n!$ hojas. Un árbol binario de altura $h$ tiene a lo sumo $2^h$ hojas, entonces:

$$
2^h \geq n! \implies h \geq \log_2(n!)
$$

Por la aproximación de Stirling:

$$
\log_2(n!) = \log_2\!\left(\sqrt{2\pi n}\left(\frac{n}{e}\right)^n\right) = \Theta(n \log n)
$$

Por tanto $h = \Omega(n \log n)$. $\blacksquare$

---

## 5. Conclusiones

- Ningún algoritmo de ordenamiento por comparación puede superar $\Omega(n \log n)$ en el peor caso.
- Merge Sort y Heap Sort garantizan $O(n \log n)$ siempre; Quick Sort es preferido en la práctica por sus constantes más bajas.
- Algoritmos no comparativos como Counting Sort o Radix Sort pueden lograr $O(n)$ bajo restricciones sobre los datos de entrada.

---

## Referencias

- Cormen, T. H. et al. (2022). *Introduction to Algorithms*, 4th ed. MIT Press.
- Knuth, D. E. (1998). *The Art of Computer Programming, Vol. 3: Sorting and Searching*. Addison-Wesley.
