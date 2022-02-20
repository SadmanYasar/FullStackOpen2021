import express from 'express';
const app = express();

app.use(express.json());

app.get('/ping', (_request, response) => {
    return response.send('pong');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server running on  port ${PORT}`);
});