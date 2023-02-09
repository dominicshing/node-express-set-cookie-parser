const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = 5000;

const app = express();

// Apply cookie-parser middleware
app.use(cookieParser());

// Home page route
app.get('/', (req, res) => {
  res.status(200).send('Homepage');
});

/*********** Set Cookies by res.cookie() Method ***********/

// [Set without Cookie Contriansts]

// 1. Set one cookie
app.get('/cookies/set-one', (req, res) => {
  // 1st argument: cookie name, 2nd argument: cookie value
  res.cookie('pid', '123');

  res.status(201).json('One cookie set');
});

// 2. Set multiple cookies
app.get('/cookies/set-multiple', (req, res) => {
  // Just add more res.cookie() method to set multiple cookies
  res.cookie('pid', '123');
  res.cookie('token', '54we68f88w6e4fw8aukyukaef76fe');

  res.status(201).json('Multiple cookies set');
});

//-----------------------------------------------------------------

// [Set with Cookie Contriansts]

// 1. Set one cookie with contriansts
app.get('/cookies/set-one-with-contraints', (req, res) => {
  // Set cookie contriansts in the object of 3rd argument

  res.cookie('sid', 'fwf24sf34e2fcv62f', {
    maxAge: 10000, // maxAge is in millisecond
    httpOnly: true, // httpOnly (cannot get by client js (e.g. document.cookie ))
    secure: true, // for https
  });

  res.status(201).json('One cookie with cookie constrainsts set');
});

// 2. Set multiple cookies with contriansts
app.get('/cookies/set-multiple-with-contraints', (req, res) => {
  res.cookie('sid', 'fwf24sf34e2fcv62f', {
    maxAge: 10000, // maxAge is in millisecond (e.g. 10000 = 10 sec)
    httpOnly: true, // httpOnly (cannot get by client js (e.g. document.cookie ))
    secure: true, // for https
  });

  // Just add more res.cookie() method to set multiple cookies
  res.cookie('token', 'weaaw45f51a5f56ewf4f56awef', {
    expires: new Date('15 feb 2023'), // in UTC time
    httpOnly: true,
    secure: true,
  });

  res.status(201).json('Multiple cookies with cookie constrainsts set');
});

/*********** Get Cookies by Response.cookies Object ***********/

// Get cookies object (with one or more key-value pair(s) in the object)
app.get('/cookies/get', (req, res) => {
  res.status(200).json(req.cookies);
});

/*********** Delete Cookies by Response.clearCookie() Method ***********/

// Delete sepecific cookie
app.get('/cookies/delete', (req, res) => {
  // Put the name of cookie to be deleted into res.clearCookie() method
  res.clearCookie('pid');
  res.status(200).json('Cookie [pid] has been deleted');
});

// Server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
