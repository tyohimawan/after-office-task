require('dotenv').config({path:__dirname+'/./../.env'});
const { Faker, id_ID } = require('@faker-js/faker');

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const fs = require('fs');
const path = require('path');
const customFaker = new Faker({locale:[id_ID]})
const base_url = process.env.API_BASE_URL;
const header = require('./../data/header-data.json');
const payloadCreateBooking = require('./../data/body-data.json');
let bookingID = 0;
let newToken = 0;

describe('E2E Automation API Restfull Booker', function() {
    this.timeout(10000);
    
    it('Generate Token with Hit API auth', async() => {
        const credential_data = {
            "username": process.env.API_USERNAME,
            "password": process.env.API_PASSWORD
        }
        const res = await request(base_url).post('/auth').send(credential_data).set(header);
        expect(res.status).to.equal(200);
        newToken = res.body.token;
        
        const envPath = path.resolve(__dirname, './../.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Ganti baris API_AUTH_TOKEN dengan token baru
        const newEnvContent = envContent.replace(/API_AUTH_TOKEN=.*/, `API_AUTH_TOKEN=${newToken}`);
        fs.writeFileSync(envPath, newEnvContent, 'utf8');
    });
    
    it('Create Booking with Hit API createBooking', async() => {
        payloadCreateBooking.firstname = customFaker.person.firstName();
        payloadCreateBooking.lastname = customFaker.person.lastName();

        const res = await request(base_url).post('/booking').send(payloadCreateBooking).set(header);
        bookingID = res.body.bookingid
        const jsonData = res.body.booking;

        expect(res.status).to.equal(200);
        expect(jsonData).to.deep.equal(payloadCreateBooking)
    });

    it('Get Booking ID with Hit API getBooking',async() => {
        const res = await request(base_url).get(`/booking/${bookingID}`).set(header)
        
        expect(res.status).to.equal(200)
        expect(res.body).to.deep.equal(payloadCreateBooking)
    });

    it('Delete Booking Data with Hit API deleteBooking',async() => {
        const headerDelete = {...header}
        headerDelete.Cookie = `token=${newToken}`
        const res = await request(base_url).delete(`/booking/${bookingID}`).set(headerDelete)
        expect(res.status).to.equal(201)
    })
})