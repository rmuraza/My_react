const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ububiko bw'abakoresha bufite default user yiteguye gukoreshwa
let users = [
  { email: "admin@rwanda.com", password: "12345" }
];

// Endpoint yo kugenzura ko server ikora
app.get('/', (req, res) => {
  res.send('Server irimo gukora neza cyane!');
});

// Endpoint yo Kwiyandikisha
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Banza wuzuze imeyili n'ijambo ry'ibanga!" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Imeyili yarakoreshejwe yamaze kwiyandikisha!" });
  }

  users.push({ email, password });
  return res.status(201).json({ success: true, message: "Wiyandikishe neza! Urashobora kwinjira." });
});

// Endpoint yo Kwinjira (Login)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Banza wuzuze imeyili n'ijambo ry'ibanga!" });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return res.status(200).json({ success: true, message: "Winjiye neza kuri Server!" });
  } else {
    return res.status(401).json({ success: false, message: "Imeyili cyangwa ijambo ry'ibanga sibyo!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server irimo gukora kuri http://localhost:${PORT}`);
});