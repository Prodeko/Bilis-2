describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
})
// 'spec.cy.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file.
// Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)
export {}
