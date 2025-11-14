/// <reference types="cypress" />
/**
 * Test de ejemplo: flujo "listar -> filtrar -> solicitar financiamiento"
 * - Bypass del login (inyecta token y userData en localStorage)
 * - Interactúa con la UI real 
 *   
 */

describe('Flujo: listar -> filtrar -> solicitar financiamiento (bypass login)', () => {
  before(() => {
    const token = `mock-jwt-token-admin-${Date.now()}`;
    const userData = { username: 'admin', role: 'ADMIN', email: 'ronaldzapet@gmail.com' };

    // Inyecta token y userData antes de que la app cargue
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('authToken', token);
        win.localStorage.setItem('userData', JSON.stringify(userData));
      },
    });
  });

  it('lista, filtra por prioridad y solicita financiamiento', () => {
    // Ruta correcta para la lista completa de solicitudes
    cy.visit('/solicitudes');

    cy.wait(2000); // Esperar a que cargue

    // Cerrar el menú lateral (sidebar) para mejor visualización
    cy.get('button[aria-label="Ocultar menú"]').then($btn => {
      if ($btn.is(':visible')) {
        cy.wrap($btn).click({ force: true });
        cy.wait(1000);
      }
    });

    // Verificar que NO haya mensaje de "No hay solicitudes"
    cy.get('body').then(($body) => {
      if ($body.text().includes('No hay solicitudes')) {
        throw new Error('No hay solicitudes en el sistema. Necesitas crear al menos una solicitud primero.');
      }
    });

    cy.wait(2000); // Esperar antes de verificar la tabla

    // Asegurarse de que la tabla existe (con timeout mayor)
    cy.get('table', { timeout: 10000 }).should('exist');

    cy.wait(2000); // Esperar antes de seleccionar prioridad

    // Seleccionar prioridad: usamos el label 'Filtrar por Prioridad' en RequestsList
    cy.contains('Filtrar por Prioridad')
      .parent()
      .find('select')
      .select('MEDIA');

    cy.wait(2000); // Esperar después de filtrar

    // Esperar indicador de paginación/contador que confirma que el filtrado y renderizado terminaron
    // Ej: "Mostrando 1-5 de 26 resultados"
    cy.contains(/Mostrando \d+-\d+ de \d+ resultados/, { timeout: 15000 }).should('be.visible');

    // Comprobar que la tabla está presente y tiene filas; si no, capturar HTML/screenshot para depuración
    cy.get('table', { timeout: 15000 }).should('exist');

    cy.document().then((doc) => {
      const rows = doc.querySelectorAll('table tbody tr');
      if (rows.length === 0) {
        // Guardar captura y HTML para depuración y fallar con mensaje claro
        cy.screenshot('debug-table-empty');
        const tableHtml = doc.querySelector('table')?.outerHTML ?? doc.documentElement.outerHTML;
        cy.writeFile('cypress/debug/table.html', tableHtml);
        throw new Error('No se encontraron filas en la tabla (table tbody tr). Se generó debug/table.html y screenshot debug-table-empty.png');
      }
    });

    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0);

    cy.wait(2000); // Esperar antes de buscar la fila correcta
      // Buscar la primera fila con estado "pendiente" y botón Financiamiento habilitado
    cy.get('table tbody tr').then(($rows) => {
      let foundEnabled = false;
      let navegacionDetectada = false;
      const tryRow = (idx: number) => {
        if (idx >= $rows.length || foundEnabled || navegacionDetectada) return;
        const $row = Cypress.$($rows[idx]);
        const rowText = $row.text().toLowerCase();
        if (!rowText.includes('pendiente')) {
          tryRow(idx + 1);
          return;
        }
        cy.get('table tbody tr').eq(idx).find('button').first().click({ force: true }).then(() => {
          cy.wait(400);
          cy.location('pathname', { timeout: 2000 }).then((path) => {
            if (path.startsWith('/financiamiento/')) {
              foundEnabled = true;
              navegacionDetectada = true;
              return;
            } else {
              cy.get('div.absolute', { timeout: 4000 }).should('be.visible').then($menu => {
                cy.wrap($menu).contains('button', 'Financiamiento').then(($btn) => {
                  if (!$btn.is(':disabled')) {
                    foundEnabled = true;
                    cy.wrap($btn).click({ force: true });
                  } else {
                    cy.wrap($menu).click('topLeft', { force: true });
                    tryRow(idx + 1);
                  }
                });
              });
            }
          });
        });
      };
      tryRow(0);
      // Solo validar si no se navegó
      cy.location('pathname').then((path) => {
        if (!foundEnabled && !path.startsWith('/financiamiento/')) {
          cy.task('log', 'No se encontró ningún botón Financiamiento habilitado en filas con PENDIENTE');
          cy.writeFile('cypress/debug/table.html', Cypress.$('body').html());
          cy.screenshot('financing_row_not_found');
          throw new Error('No se encontró ninguna fila con estado pendiente y botón Financiamiento habilitado.');
        }
      });
    });

    cy.wait(2000); // Esperar antes de verificar la URL

    // Ahora estamos en la página de Solicitar Financiamiento
    cy.url().should('match', /\/financiamiento\/\d+/);

    // Esperar a que desaparezca el texto de loading
    cy.contains('Cargando...', { timeout: 20000 }).should('not.exist');

    // Diagnóstico y espera robusta: comprobar el DOM completo para el input
    cy.document().then((doc) => {
      const enabledInput = doc.querySelector('input[placeholder="Ingresa el monto en quetzales"]:not([disabled])');
      if (!enabledInput) {
        // Guardar captura y HTML para depuración y fallar con mensaje claro
        cy.screenshot('debug-no-enabled-input-after-nav');
        const html = doc.documentElement.outerHTML;
        cy.writeFile('cypress/debug/financing_after_nav.html', html);
        throw new Error('No se encontró el input de monto habilitado después de navegar a la página de financiamiento. Revisar cypress/debug/financing_after_nav.html y screenshot.');
      }
    }).then(() => {
      // Si llegamos aquí, el input habilitado existe; interactuamos con los campos
      cy.get('input[placeholder="Ingresa el monto en quetzales"]:not(:disabled)', { timeout: 20000 })
        .should('be.visible')
        .clear()
        .type('2500');
      cy.get('input[type="date"]', { timeout: 20000 }).should('be.visible').type('2025-10-24');
      cy.get('input[type="email"]', { timeout: 20000 }).should('be.visible').clear().type('ronaldzapet@gmail.com');

      // Asegurarse de que el botón esté visible y habilitado antes de hacer click
      cy.contains('button', 'Solicitar Financiamiento', { timeout: 20000 })
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      // Esperar a que el botón desaparezca (el formulario se cierra o navega)
      cy.contains('button', 'Solicitar Financiamiento').should('not.exist');

      cy.wait(2000); // Esperar antes de verificar la navegación

      // Esperamos la navegación a /solicitudes
      cy.url({ timeout: 20000 }).should('include', '/solicitudes');

      cy.log('✓ Flujo de financiamiento completado exitosamente');
    });
  });
});