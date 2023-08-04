describe("Test email verification", () => {
  const testEmailAddress = `test.${new Date().getTime()}@${Cypress.env("MAILISK_NAMESPACE")}.mailisk.net`;

  it("Should sign up a new user", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("#email").type(testEmailAddress);
    cy.get("#password").type("password");
    cy.get("form").submit();
    // if the register was successful we should be redirected to the login screen
    cy.location("pathname").should("eq", "/");
  });

  it("Should login as user", () => {
    cy.get("#email").type(testEmailAddress);
    cy.get("#password").type("password");
    cy.get("form").submit();
    // if the login was successful we should be redirected to the verify email screen, as we haven't verified our email yet
    cy.location("pathname").should("eq", "/verify-email");
    // at this point an email with the verification code will be sent by the backend
  });

  it("Should verify email", () => {
    cy.visit("http://localhost:3000/verify-email");

    let code;
    // mailiskSearchInbox will automatically keep retrying until an email matching the prefix arrives
    // by default it also has a from_timestamp that prevents older emails from being returned by accident
    // find out more here: https://docs.mailisk.com/guides/cypress.html#usage
    cy.mailiskSearchInbox(Cypress.env("MAILISK_NAMESPACE"), { to_addr_prefix: testEmailAddress }).then((response) => {
      const emails = response.data;
      const email = emails[0];
      // we know that the code is the only number in the email, so we easily filter it out
      code = email.text.match(/\d+/)[0];
      expect(code).to.not.be.undefined;

      // now we enter the code and confirm our email
      cy.get("#email").type(testEmailAddress);
      cy.get("#code").type(code);
      cy.get("form").submit();

      // we should be redirected to the dashboard as proof of a successful verification
      cy.location("pathname").should("eq", "/dashboard");
    });
  });

  it("Should login as user again", () => {
    // as a sanity check we want to ensure our email is verified, by logging in again
    cy.visit("http://localhost:3000/");
    cy.get("#email").type(testEmailAddress);
    cy.get("#password").type("password");
    cy.get("form").submit();
    // this time we should be redirected to the dashboard since we've verified the email
    cy.location("pathname").should("eq", "/dashboard");
  });
});
