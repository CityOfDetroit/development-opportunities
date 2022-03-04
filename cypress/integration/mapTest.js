describe('Test map functionality', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('WELCOME TO THE CITY OF DETROIT PROPERTY SEARCH MAP')
    })

    it('test map click', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('WELCOME TO THE CITY OF DETROIT PROPERTY SEARCH MAP')
      cy.get('#close-welcome').click()
      cy.get('canvas.mapboxgl-canvas').click('center')
      cy.wait(3000)
      cy.contains('City of Detroit')
    })

    it('enter address in geocoder', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('WELCOME TO THE CITY OF DETROIT PROPERTY SEARCH MAP')
      cy.get('#close-welcome').click()
      cy.get('#geocoder input').type('1104 military{enter}')
      cy.wait(3000)
      cy.get('.panel-box h2').contains('1104 MILITARY')
    })
})