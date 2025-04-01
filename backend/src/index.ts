import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import userRouter from './routes/auth';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { userMiddleware } from './middleware';

const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());
// Create Content
app.use('/auth',userRouter);
//@ts-ignore
app.post('/:userId/content/add', userMiddleware ,upload.single('field'), async (req: Request, res: Response) => {
  const { title, description, url, filePath, tags } = req.body;
  const { userId } = req.params;

  try {
    // Ensure each tag is unique per user
    for (let i = 0; i < tags.length; i++) {
      const tag = await prisma.tag.findUnique({
        where: {
          name_userId: {  // Prisma compound unique key
            name: tags[i],
            userId: userId
          }
        }
      });

      if (!tag) {
        await prisma.tag.create({
          data: {
            name: tags[i],
            userId: userId
          }
        });
      }
    }
    console.log(tags,typeof(tags));
    const safeTags = Object.values(tags);

    // Handle file upload
    let fileLocation = null;
    if (req.file) {
      fileLocation = req.file.path;
    }

    const tagRecords = await Promise.all(
      (Array.isArray(tags.value)? tags.value:[]).map(async (tag: string) => {
        return prisma.tag.upsert({
          where: { name_userId: { name: tag, userId } },
          update: {},
          create: { name: tag, userId }
        });
      })
    );
    
    // Create content and connect existing tags
    const content = await prisma.content.create({
      data: {
        title,
        description,
        url,
        filePath: fileLocation,
        userId,
        tags: {
          create: tagRecords.map(tag => ({ tag: { connect: { id: tag.id } } }))
        }
      },
      include: { tags: true }
    });
  
    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create content' });
  }
});

// Get Content by User
app.get('/content/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const content = await prisma.content.findMany({
      where: { userId },
      include: { tags: true },
    });

    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch content' });
  }
});

// Get Content by Tag
app.get('/content/tag/:tagId', async (req: Request, res: Response) => {
  const { tagId } = req.params;

  try {
    const content = await prisma.contentTag.findMany({
      where: { tagId: parseInt(tagId) },
      include: { content: true },
    });

    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch content by tag' });
  }
});

// Update Content
app.put('/content/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, textContent, url, tags } = req.body;

  try {
    const updatedContent = await prisma.content.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        textContent,
        url,
        tags: {
          deleteMany: {}, // Remove existing tags
          create: tags.map((tagId: number) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: { tags: true },
    });

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update content' });
  }
});

// Delete Content
app.delete('/content/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.content.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete content' });
  }
});
app.post("/fetch-meta", async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const metaTags = {
      title: $('meta[property="og:title"]').attr("content") || $("title").text(),
      description: $('meta[property="og:description"]').attr("content") || "",
      image: $('meta[property="og:image"]').attr("content") || "",
    };

    res.json(metaTags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});