import request from 'supertest';
import dotenv from 'dotenv';
import { expect } from 'chai'; 


const API_BASE_URL = 'https://deimoss.web05.lol/'; 
let token = '';


function generateRandom13DigitNumber() {
    const min = 1000000000000; 
    const max = 9999999999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genPI = generateRandom13DigitNumber().toString()
console.log(genPI)

const defaultName = 'John'

describe('API Endpoints', () => {

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(API_BASE_URL)
        .post('/register')
        .send({
          pi: genPI,
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
          pi: genPI,
          password: 'passwordhash',
          rol: 'usuario_comun'
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message', 'Inicio de sesión exitoso');
      expect(response.body).to.have.property('acces_token');
      token = response.body.acces_token
    });
    
  });

  describe('GET /rating/:id_institution', () => {
    it('should get rating from an institution', async () => {
      const response = await request(API_BASE_URL)
        .get('/rating/26');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.above(0);
    });
    
  });


  describe('GET /institutions/:name', () =>{
    it('should return the information of an institution based in the institution name ', async() =>{
      const sub = 'con';
      const response = await request(API_BASE_URL)
        .get(`/institutions/${sub}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.above(0);
      expect(response.body[0].name_procedure.toLowerCase()).to.include(sub);
    })
  })

  describe('POST /comment', () =>{
    it('Should post a new comment in an institution', async() =>{
      const def_content = 'Hola';
      const response = await request(API_BASE_URL)
      .post('/comment')
      .send({
        token: token,
        content: def_content,
        conversation_id: 1
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message', 'Comentario creado');

      const response2 = await request(API_BASE_URL)
      .get('/comments/1')

      expect(response2.status).to.equal(200);
      expect(response2.body).to.be.an('array');
      expect(response2.body).to.have.lengthOf.above(0);

      const result = response2.body.find(item => item.name === defaultName); 

      expect(result).to.not.be.undefined; 
      expect(result.content).to.equal(def_content);
    })
  })

  describe('GET /requirements/id:procedure', () =>{
    it('should get te requirements for a procedure given the procedure ID', async() =>{
      const response = await request(API_BASE_URL)
      .get('/requirements/4')

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.not.be.empty;
    })

  })

  describe('GET /institutions', () =>{
    it('should get all the information form all institutions', async() =>{
      const response = await request(API_BASE_URL)
      .get('/institutions')

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.above(0);
    })
  })

  describe('GET /rating/:id_institution', () =>{
    it('should get the rating of a specific institution', async() =>{
      const institution_id = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
      console.log(institution_id)
      const response = await request(API_BASE_URL)
      .get(`/rating/${institution_id}`)

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('rating');
      expect(response.body[0]['rating']).to.be.a('number').and.to.be.within(0.0, 5.0);

    })
  })

  describe('POST /rating', () =>{
    it('should post a rating for an institution', async() =>{
      const response = await request(API_BASE_URL)
      .post('/rating')
      .send({institution: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
        rating: Math.random() * (5.0 - 0.0 ) + 0.0,
        token: token}
      )

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('succes', true);
    })
  })

  //Eliminar todos los registros creados para las pruebas. 
  after(async() =>{
    await request(API_BASE_URL)
    .delete(`/user/${genPI}`)
    .expect(200)
  })

});



