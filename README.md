
Prueba de Carga (K6) – Login FakeStoreAPI
=========================================

Objetivo
--------
Ejecutar una prueba de carga del endpoint POST https://fakestoreapi.com/auth/login alcanzando ≥20 TPS, con p(95) ≤ 1.5 s y error rate < 3%.

Versiones sugeridas
-------------------
- k6 v0.49+
- SO: Windows/macOS/Linux

Estructura
----------
- script.js → script principal de k6 dónde también se encuentran los usuarios
- reports/ → textSummary.txt y summary.json al finalizar la ejecución

Instalación k6 (ejemplos)
-------------------------
- Windows (choco): choco install k6
- macOS (brew): brew install k6

Ejecución
---------
# Escenario base: 20 TPS por 3 minutos, 50 VUs preasignados
k6 run -e RATE=20 -e DURATION=3m -e VUS=50 -e MAX_VUS=100 login_load_test.js

# Escenario más agresivo: 30 TPS por 5 minutos
k6 run -e RATE=30 -e DURATION=5m -e VUS=80 -e MAX_VUS=160 login_load_test.js

Criterios de aceptación (thresholds)
------------------------------------
- http_req_duration: p(95)<1500 → 95% ≤ 1.5 s
- checks: rate>0.97 → error < 3%
- error_rate: rate<0.03 → métrica explícita de error < 3%

Autor: Nahomi Gilces R. – 2026-03-10
 http_req_duration: p(95)<1500 → 95% ≤ 1.5 s
- checks: rate>0.97 → error < 3%
- error_rate: rate<0.03 → métrica explícita de error < 3%
