import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 4000;
const masterkey = "6750552602";

const foodItems = [
    {
        id: 1,
        name: "Biryani",
        img: "https://example.com/biryani.jpg",
        content: "A classic Indian dish",
        category: "Indian",
        score: 5
    },
    {
        id: 2,
        name: "Pizza",
        img: "https://example.com/pizza.jpg",
        content: "An Italian favorite",
        category: "Italian",
        score: 4.8
    },
    {
        id: 3,
        name: "Sushi",
        img: "https://example.com/sushi.jpg",
        content: "A Japanese delicacy",
        category: "Japanese",
        score: 4.7
    },
    {
        id: 4,
        name: "Burger",
        img: "https://example.com/burger.jpg",
        content: "A popular fast food item",
        category: "American",
        score: 4.5
    },
    {
        id: 5,
        name: "Tacos",
        img: "https://example.com/tacos.jpg",
        content: "A Mexican staple",
        category: "Mexican",
        score: 4.6
    },
    {
        id: 6,
        name: "Pasta",
        img: "https://example.com/pasta.jpg",
        content: "A versatile Italian dish",
        category: "Italian",
        score: 4.7
    },
    {
        id: 7,
        name: "Ramen",
        img: "https://example.com/ramen.jpg",
        content: "A comforting Japanese noodle soup",
        category: "Japanese",
        score: 4.8
    },
    {
        id: 8,
        name: "Paella",
        img: "https://example.com/paella.jpg",
        content: "A traditional Spanish dish",
        category: "Spanish",
        score: 4.6
    },
    {
        id: 9,
        name: "Dosa",
        img: "https://example.com/dosa.jpg",
        content: "A South Indian specialty",
        category: "Indian",
        score: 4.9
    },
    {
        id: 10,
        name: "Dim Sum",
        img: "https://example.com/dimsum.jpg",
        content: "A Cantonese favorite",
        category: "Chinese",
        score: 4.5
    },
    {
        id: 11,
        name: "Falafel",
        img: "https://example.com/falafel.jpg",
        content: "A popular Middle Eastern dish",
        category: "Middle Eastern",
        score: 4.7
    },
    {
        id: 12,
        name: "Samosa",
        img: "https://example.com/samosa.jpg",
        content: "A crispy Indian snack",
        category: "Indian",
        score: 4.8
    },
    {
        id: 13,
        name: "Pho",
        img: "https://example.com/pho.jpg",
        content: "A flavorful Vietnamese noodle soup",
        category: "Vietnamese",
        score: 4.6
    },
    {
        id: 14,
        name: "Kimchi",
        img: "https://example.com/kimchi.jpg",
        content: "A Korean fermented dish",
        category: "Korean",
        score: 4.4
    },
    {
        id: 15,
        name: "Steak",
        img: "https://example.com/steak.jpg",
        content: "A grilled meat dish",
        category: "American",
        score: 4.7
    },
    {
        id: 16,
        name: "Curry",
        img: "https://example.com/curry.jpg",
        content: "A spicy dish with various flavors",
        category: "Indian",
        score: 4.9
    },
    {
        id: 17,
        name: "Tempura",
        img: "https://example.com/tempura.jpg",
        content: "A crispy Japanese dish",
        category: "Japanese",
        score: 4.6
    },
    {
        id: 18,
        name: "Chow Mein",
        img: "https://example.com/chowmein.jpg",
        content: "A popular Chinese stir-fried noodle dish",
        category: "Chinese",
        score: 4.5
    },
    {
        id: 19,
        name: "Peking Duck",
        img: "https://example.com/pekingduck.jpg",
        content: "A traditional Chinese dish",
        category: "Chinese",
        score: 4.8
    },
    {
        id: 20,
        name: "Gelato",
        img: "https://example.com/gelato.jpg",
        content: "A creamy Italian ice cream",
        category: "Italian",
        score: 4.9
    }
];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());


// Sending all json data
app.get("/all", (req, res) => {
    res.send(foodItems);
});


// Sending random json data
app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * foodItems.length);
    const randomData = foodItems[randomIndex];
    res.send(randomData);
});


// Data with specific id - path parameter
app.get("/specific/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const data = foodItems.find((item) => item.id === id);
    if(data) {
        res.send(data);
    } else {
        res.send("DATA NOT FOUND. TRY AGAIN!");
    }
});


// Filter the data - query parameter
app.get("/filter", (req, res) => {
    const category = req.query.category;
    const data = foodItems.filter((item) => item.category === category);
    if(data) {
        res.send(data);
    } else {
        res.send("DATA NOT FOUND. TRY AGAIN!");
    }
});


// Posting the data
app.post("/post", (req, res) => {
    const addData = {
        id: foodItems.length + 1,
        name: req.body.name,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category,
        score: req.body.score
    }
    foodItems.push(addData);
    res.send(addData);
});

 
// Update data - path parameter
app.put("/put/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = foodItems.findIndex((item) => item.id === id);
    if(index !== -1) {
        const replacementData = {
            id: foodItems[index].id,
            name: req.body.name,
            img: req.body.img,
            content: req.body.content,
            category: req.body.category,
            score: req.body.score           
        }
    foodItems[index] = replacementData;
    res.send(replacementData);
    } else {
        return res.status(404).send("ITEM NOT FOUND.");
    }
});


// Partial Updata Data
app.patch("/patch/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingData = foodItems.find((item) => item.id === id);
    if(! existingData) {
        return res.status(404).send("ITEM NOT FOUND.");
    }
    const updateData = {
        id: existingData.id,
        name: req.body.name || existingData.name,
        img: req.body.img || existingData.img,
        content: req.body.content || existingData.content,
        category: req.body.category || existingData.category,
        score: req.body.score || existingData.score,    
    }
    const index = foodItems.findIndex((item) => item.id === id);
    if(index !== -1) {
        foodItems[index] = updateData
    }
    res.send(updateData);
});



// Delete with specific id
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const data = foodItems.findIndex((item) => item.id === id);
    if(data > -1) {
        foodItems.splice(data, 1);
        res.send('Successfully deleted the item...');
    } else {
        return res.status(404).send("ITEM NOT FOUND.");
    }
});


// Delete all data
app.delete("/deleteAll", (req, res) => {
    const key = req.query.key;
    if(key === masterkey) {
        foodItems.splice(0, foodItems.length);
        res.send("Successfully deleted all....");
    } else {
        return res.status(404).send("ITEM NOT FOUND.");
    }
})


app.listen(port, (req, res) => {
    console.log(`Server running on port: http://localhost:${port}`);
})