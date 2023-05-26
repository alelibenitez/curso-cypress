/// <reference types="cypress" />
import { RegisterPage } from "../support/pages/registerPage";
import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import {ProductsPage} from "../support/pages/productsPage";
import {ShoppingCartPage } from "../support/pages/shoppingCartPage";


describe('Entrega Final', () => {
   let datosFixture
   //const registerPage = new RegisterPage();
   //const loginPage = new LoginPage();
   const homePage = new HomePage();
   const productPage = new ProductsPage();
   const shoppingCartPage = new ShoppingCartPage();

   before(() => {
        cy.fixture('datos').then((data)=> {
            datosFixture = data
        })      
    })

    beforeEach(() => {
        cy.visit('/');
        
    });

    
    it("Elegir 2 productos a elección, añadirlos al carrito, verificar nombre y precio, verificar precio acumulado, completar checkout y verificar los datos en el ticket de compra", () => {
        
        const numero = Math.floor(Math.random() * 1000)
        const bodyRequest = {
                username: `pushingit ${numero}`,
                password: '123456!',
                gender:'Female',
                day:'9',
                month:'Abril',
                year: '1998',        
        }
        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body:bodyRequest
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
            
        })

       cy.request({
            url:'https://pushing-it.onrender.com/api/login',
            method: 'POST',
            body:{
                username: bodyRequest.username,
                password: bodyRequest.password
            }
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200)
        })

        homePage.clickonlineShop();
        productPage.seleccionarProducto(datosFixture.products.prod1.name);    
        productPage.closeMessageAlert();
        productPage.seleccionarProducto(datosFixture.products.prod2.name);
        productPage.closeMessageAlert();
        productPage.goToShoppingCart();
        shoppingCartPage.verificarProducto(datosFixture.products.prod1.name).should('have.text',datosFixture.products.prod1.name );
        shoppingCartPage.verificarProducto(datosFixture.products.prod2.name).should('have.text',datosFixture.products.prod2.name );
        shoppingCartPage.verificarPrecio(datosFixture.products.prod1.price).should('have.text', '$'+ datosFixture.products.prod1.price);
        shoppingCartPage.verificarPrecio(datosFixture.products.prod2.price).should('have.text', '$'+ datosFixture.products.prod2.price);
        shoppingCartPage.clickShowTotalPrice()
        shoppingCartPage.verficarPrecioTotal().should('have.text',`${datosFixture.products.prod1.price + datosFixture.products.prod2.price}`);
            
    });   
    
    after(() => {
        cy.request({
            url:`https://pushing-it.onrender.com/api/deleteuser/${bodyRequest.username}`,
            method: 'DELETE'
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200)
        })      
    })
});