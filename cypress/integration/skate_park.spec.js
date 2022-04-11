//prueba smoke-test o test minimo de vialibilidad

const { idleTimeoutMillis } = require("pg/lib/defaults")

describe("Skate Park", () => {
    it("frontpage can be opened", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Skate Park")
    })
})
//test a 1 boton
    it("Click a boton de ingreso de usuario", () => {
      cy.visit("http://localhost:3000/login");
      cy.contains("Iniciar Sesión").click();
    });
//test a input
it("Click test Input", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type("mconsuelo.gomezt@gmail.com");
})
 it("Click test Input Email", () => {
   cy.visit("http://localhost:3000/login");
   cy.get('input[name="password"]').type("1234");
 });

