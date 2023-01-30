const http = require("http");
const compliments = [  "You are amazing!",  "You are a true inspiration.",  "You brighten up everyone's day.",  "You have a unique and wonderful personality.",  "You are incredibly talented.",  "You have a heart of gold."];

const colors = [  "red",  "orange",  "yellow",  "green",  "blue",  "indigo",  "violet"];

let usedCompliments = [];

const getRandomCompliment = () => {
  if (compliments.length === 0) {
    compliments.push(...usedCompliments);
    usedCompliments = [];
  }

  const index = Math.floor(Math.random() * compliments.length);
  const compliment = compliments[index];
  usedCompliments.push(compliment);
  compliments.splice(index, 1);

  return compliment;
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  const compliment = getRandomCompliment();
  res.end(`
    <html>
      <head>
        <style>
          body {
            background: linear-gradient(to bottom, #333, #555);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: monospace;
            color: white;
            overflow: hidden;
          }
          h1 {
            font-size: 72px;
            text-shadow: 2px 2px lightgray;
            text-align: center;
            margin: 0;
            position: relative;
            width: 100%;
          }
          span {
            display: inline-block;
            min-width: 40px;
            position: relative;
            top: 0;
            left: 0;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        </style>
      </head>
      <body>
        <h1>
          ${compliment
            .split("")
            .map(
              (char, index) =>
                `<span style="color: ${
                  colors[index % colors.length]
                }; animation-delay: ${0.1 * index}s;">${char}</span>`
            )
            .join("")}
        </h1>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
