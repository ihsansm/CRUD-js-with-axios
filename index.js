import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Pentingnya Menjaga Kesehatan Mental",
    content:
      "Dalam era modern yang penuh tekanan, kesehatan mental menjadi hal yang sangat penting untuk diperhatikan. Banyak orang terjebak dalam rutinitas harian yang melelahkan, sehingga sering kali mengabaikan keseimbangan emosi dan ketenangan batin. Meluangkan waktu untuk diri sendiri, melakukan hobi yang disukai, dan berbicara dengan orang terdekat dapat membantu menjaga kesehatan mental tetap stabil.",
    author: "ncep piludin",
    date: new Date(),
  },
  {
    id: 2,
    title: "Keindahan Alam yang Terlupakan",
    content:
      "Di tengah kemajuan teknologi dan modernisasi, keindahan alam sering kali terlupakan. Hutan-hutan yang rimbun, pegunungan yang megah, dan pantai-pantai yang menenangkan kini tak lagi menjadi destinasi utama. Padahal, keindahan alam tidak hanya menyegarkan mata, tetapi juga memberikan kedamaian bagi jiwa. Kita perlu kembali mengapresiasi dan menjaga alam sebagai warisan yang tak ternilai.",
    author: "aul slebew",
    date: new Date(),
  },
  {
    id: 3,
    title: "Inovasi Teknologi dalam Pendidikan",
    content:
      "Perkembangan teknologi telah membawa perubahan besar dalam dunia pendidikan. Dengan adanya pembelajaran online dan akses mudah ke berbagai sumber informasi, siswa kini dapat belajar kapan saja dan di mana saja. Teknologi tidak hanya mempermudah proses belajar, tetapi juga membuka peluang baru bagi mereka yang sebelumnya terhalang oleh keterbatasan akses terhadap pendidikan.",
    author: "agnes jos gandos",
    date: new Date(),
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found"});
  res.json(post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.content,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if(!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});
//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found"})

  posts.splice(index, 1);
  res.json({ message: "Post deleted"});
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
