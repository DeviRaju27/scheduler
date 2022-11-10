describe("Navigation", () => {
  it("should visit root", () => {
    cy
    .visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy
    .contains("li", "Tuesday")
    .click()
    .should("have.class","day-list__item--selected");
  });
  it("should naviage to Tuesday with id", () =>{
    cy
    .contains("[data-testid=day]", "Tuesday")
    .click()
  })
});