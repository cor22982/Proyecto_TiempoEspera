import request from 'supertest';
import dotenv from 'dotenv';
import { expect } from 'chai'; 


const API_BASE_URL = 'https://deimoss.web05.lol/'; 


function generateRandom13DigitNumber() {
    const min = 1000000000000; 
    const max = 9999999999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



describe('API Endpoints', () => {

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(API_BASE_URL)
        .post('/register')
        .send({
          pi: generateRandom13DigitNumber().toString(),
          name: 'John',
          lastname: 'Doe',
          password_md5: 'passwordhash',
          age: 30,
          type_user: 'usuario_comun'
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'user created' });
    });
  });


  describe('POST /login', () => {
    it('should login a user with correct credentials', async () => {
      const response = await request(API_BASE_URL)
        .post('/login')
        .send({
          pi: '3834734839834',
          password: 'passwordhash',
          rol: 'usuario_comun'
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message', 'Inicio de sesión exitoso');
      expect(response.body).to.have.property('acces_token');
    });
    
  });

  describe('GET /rating/:id_institution', () => {
    it('should a rating from an institution', async () => {
      const response = await request(API_BASE_URL)
        .get('/rating/26');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.above(0);
    });
    
  });
});
