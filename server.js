require('dotenv').config()
const OpenAI = require("openai");
const opAI = new OpenAI({
  apiKey: process.env.API_KEY,
});

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/generate-message", async (req, res) => {
    const userInput = req.query.userInput;
    const language = req.query.language;
  const completion = await opAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Generate a message to enthusiastically say a question sounds interesting and you need some time to think about it.",
      },
      {
        role: "user",
        content: "Write a program to print factorial of a number in C.",
      },
      {
        role: "assistant",
        content:
          "Wow! that's an interesting question to solve! Give me some time while my digital brain processes your request.",
      },
      {
        role: "user",
        content:
          "Write a program to print prime numbers till user given input in java.",
      },
      {
        role: "assistant",
        content:
          "I'll spend a few moments considering that. But that's a nice question to practice programming in Java.",
      },
      {
        role: "user",
        content:
          "Write a program to print odd numbers till user given input in python.",
      },
      {
        role: "assistant",
        content:
          "Hold on! That's a very good question for beginners to learn programming.",
      },
      {
        role: "user",
        content:
          "Write a program for binary searching in java.",
      },
      {
        role: "assistant",
        content:
          "Woah! That's a very good question for learning the basics of algorithmic problems. Sit tight while I get this sorted.",
      },
      {
        role: "user",
        content: `Write a program to ${userInput} in ${language}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  res.send(completion.choices[0]);
});

app.get("/get-code", async (req, res) => {
  const userInput = req.query.userInput;
  const language = req.query.language;
  const completion = await opAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Write a program in user selected language according to the question provided by the user and provide a short description of it.",
      },
      { role: "user", content: "Write a program in C to print hello world." },
      {
        role: "assistant",
        content: `#include <stdio.h>
        void main()
        {
           printf("Hello World!");
        }
        // This program prints "Hello World" using the printf function provided by C.`,
      },
      {
        role: "user",
        content:
          "Write a program in java to check if a user entered number is prime or not in.",
      },
      {
        role: "assistant",
        content:
          `import java.util.Scanner
          class Prime
          public static void main()
          {
             System.out.println("Enter a number");
             Scanner sc = new Scanner(System.in);
             int n = sc.nextInt();
             int c = 2;
             while(c < n)
             {
                 if(n%c == 0)
                 {
                     System.out.println("Not prime");
                     break;
                 }
             }
             System.out.println("Prime");
          }`,
      },
      {
        role: "user",
        content:
          `Write a program in ${language} to ${userInput}.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  res.send(completion.choices[0]);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
