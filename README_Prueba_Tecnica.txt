📘 README - Prueba Técnica de Automatización y Carga

📂 Estructura del proyecto

    doublev-prueba/
    ├─ api-tests/          # Pruebas API con Playwright
    │   └─ api.spec.js
    ├─ ui-tests/           # Pruebas UI con Playwright (Page Object Model)
    │   ├─ playwright.config.js
    │   ├─ pages/
    │   │   └─ RegisterPage.js
    │   └─ tests/
    │       └─ e2e.spec.js
    ├─ load-tests/         # Pruebas de carga con k6
    │   ├─ k6_150_2min.js
    │   └─ k6_scale_100_1000.js
    ├─ docs/               # Documentación / reportes de ejecución
    ├─ package.json
    └─ package-lock.json

------------------------------------------------------------------------

⚙️ Instalaciones necesarias

1. Node.js

-   Descargar e instalar Node.js 18+: https://nodejs.org

-   Verificar instalación:

        node -v
        npm -v

2. Playwright

Desde la raíz del proyecto:

    npm install
    npx playwright install

3. k6 (pruebas de carga)

Instala k6 (en Windows puedes usar Scoop o Chocolatey):

Con Scoop (recomendado):

    scoop install k6

Con Chocolatey:

    choco install k6

Verifica instalación:

    k6 version

------------------------------------------------------------------------

▶️ Ejecución de las pruebas

1. Pruebas API (Playwright)

Ejecuta los tests en la carpeta api-tests:

    npm run test:api

Este flujo realiza: 1. Listar productos de la categoría electronics. 2.
Consultar un producto específico. 3. Crear un nuevo producto. 4.
Actualizar la imagen del producto creado.

------------------------------------------------------------------------

2. Pruebas de Carga (k6)

a) 150 usuarios concurrentes por 2 minutos

    k6 run load-tests/k6_150_2min.js

b) Escalamiento de 100 → 1000 usuarios en intervalos de 150

    k6 run load-tests/k6_scale_100_1000.js

  💡 Para guardar resultados en JSON (evidencia):

    k6 run --out json=./docs/k6_results.json load-tests/k6_150_2min.js

------------------------------------------------------------------------

3. Pruebas UI (Playwright con Page Object Model)

Ejecuta los tests en ui-tests/tests:

    npm run test:ui

Este flujo cubre: - Registro de usuario - Login con el usuario recién
creado - Navegación a Laptops & Notebooks → MacBook Pro - Búsqueda de
Samsung Galaxy tablet - Agregar productos al carrito - Modificar
cantidades, eliminar productos - Ir a checkout y confirmar compra

Ver reportes

Después de correr los tests:

    npx playwright show-report

El reporte incluye: - Evidencias de ejecución - Capturas de pantalla en
caso de error - Video de la prueba (según configuración en
playwright.config.js)

------------------------------------------------------------------------

📑 Evidencias requeridas

En la carpeta docs/ debes adjuntar: - Capturas de consola de la
ejecución de cada prueba (API, UI, k6). - Archivo JSON/CSV de resultados
de k6 (k6_results.json). - Reporte HTML de Playwright
(playwright-report/). - Videos generados por Playwright (ya configurado
en playwright.config.js).

------------------------------------------------------------------------

📝 Scripts útiles en package.json

    "scripts": {
      "test:api": "npx playwright test api-tests",
      "test:ui": "npx playwright test ui-tests/tests"
    }

------------------------------------------------------------------------

✅ Recomendaciones finales

-   Siempre abre una nueva terminal después de instalar k6 (para que
    tome el PATH).
-   Usa headless: false en playwright.config.js si quieres ver la
    ejecución en el navegador.
-   Adjunta en tu entrega:
    -   Repo completo en GitHub con esta estructura.
    -   Carpeta docs/ con evidencias.
    -   Video de ejecución de las pruebas UI.

------------------------------------------------------------------------
